
import NATS, { ClientOpts } from 'nats'
import NATS_STREAMING, { StanOptions } from 'node-nats-streaming'
import * as tls from 'tls'
import fs from 'fs'
import {
    getMessageBrokerURL, getMessageBorkerClusterID,
    getMessageBrokerSSLMODE,
    getMessageBrokerCertifcatePath, getMessageBrokerKeyPath, getMessageBrokerCertificateAuthorityPath, getClientID
} from '../config/config-manager'

let broker: NATS.Client

let stan: NATS_STREAMING.Stan

export function GetBroker(): NATS.Client {
    try {
        if (broker === undefined) {
            broker = initializeBroker()
            return broker
        }
        return broker
    } catch (e) {
        throw e
    }
}

export function GetStreamBroker(): NATS_STREAMING.Stan {
    try {
        if (stan === undefined) {
            stan = initializeStreamBroker()
            return stan
        }
        return stan
    } catch (e) {
        console.log('error initializing broker')
        throw e
    }
}

function initializeBroker(): NATS.Client {


    try {
        console.log('...initializing message broker')
        const url: string = getMessageBrokerURL()
        const servers = [url]
        console.log('...broker url ', url)
        var opts: ClientOpts = {
            encoding: 'binary'
        }
        opts.servers = servers
        opts.tls = getTLSOptions()
        const nc = NATS.connect(opts)

        broker = nc

        console.log('...message broker initialized')
        return nc
    } catch (e) {
        console.log('...broker init error ', e)
        throw e
    }

}

function initializeStreamBroker(): NATS_STREAMING.Stan {

    try {

        console.log('...initializing message broker')
        const clusterID: string = getMessageBorkerClusterID()
        console.log('...clusterID  ', clusterID)
        const clientID = getClientID()
        console.log('...clientID  ', clientID)
        const opts: StanOptions = getStanOptions()
        stan = NATS_STREAMING.connect(clusterID, clientID, opts)
        return stan
    } catch (e) {
        console.log('...broker init error ', e)
        throw e
    }

}

function readFile(path: string): string {

    let file = fs.readFileSync(path, { encoding: "utf8" });

    return file

}




function getStanOptions(): StanOptions {

    try {
        const stanOptions: StanOptions = {
            url: getMessageBrokerURL()
        }

        if (getMessageBrokerSSLMODE()) {
            stanOptions.tls = getTLSOptions()

        }

        return stanOptions
    } catch (e) {
        throw e
    }
}

function getTLSOptions(): tls.TlsOptions {

    try {
        console.log('...establishing TLS connetion to message broker')
        const certificate_file = getMessageBrokerCertifcatePath()
        const key_file = getMessageBrokerKeyPath()
        const ca_file = getMessageBrokerCertificateAuthorityPath()

        const cert = readFile(certificate_file)
        const key = readFile(key_file)
        const ca = readFile(ca_file)

        const tlsOptions: tls.TlsOptions = {
            ca: ca,
            key: key,
            cert: cert
        }
        return tlsOptions
    } catch (e) {
        throw e
    }
}
