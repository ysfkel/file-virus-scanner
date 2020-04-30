


import * as publisher from '../messaging/publisher/scanner'
import { AntimalwareClientType } from '../antimalware/antimalware-client'
import { StorageClientType } from '../file-storage/storage/storage-client'
import { getMessageBody, getMessageBuffer } from './helper'
import { MessageData } from './types'
import { Message } from 'node-nats-streaming'
export default class FileScanner {

    storageClient: StorageClientType
    antimalwareClient: AntimalwareClientType

    constructor(storageClient: StorageClientType, antimalWareClient: AntimalwareClientType) {
        if (!storageClient) {
            throw new Error('Exception: storageClient cannot be undefined')
        }
        if (!antimalWareClient) {
            throw new Error('Exception: antimalWareClient cannot be undefined')
        }

        this.storageClient = storageClient
        this.antimalwareClient = antimalWareClient

    }

    async ScanFileAsync(messagePayload: Message): Promise<void> {
        try {

            const messageDataString = messagePayload.getData()

            const message: MessageData = JSON.parse(messageDataString as string)

            let messageBody = getMessageBody(message.Body)

            const fileName = messageBody.filename

            const dataStream = await this.storageClient.ReadDataStreamAsync(fileName)

            this.antimalwareClient.Scan(dataStream, (err, object, malicious) => {
                if (err) {
                    console.log(object.path + ": " + err);
                    messageBody["status"] = "scan-failed"
                    publishMessage(publisher.publishFileScanFailed, messageBody, message)
                } else if (malicious) {
                    console.log(object.path + ": " + malicious + " FOUND");
                    console.log("Virus Detected");
                    messageBody["status"] = "virus-detected"
                    messageBody["virus-signature"] = `${malicious} FOUND`
                    publishMessage(publisher.publishFileScanMaliciuos, messageBody, message)
                } else {
                    console.log(object.path + ": OK");
                    messageBody["status"] = "ok"
                    publishMessage(publisher.publishFileScanOk, messageBody, message)
                }
            })
        } catch (e) {
            throw e
        }
    }

}

function publishMessage(publish: (message: any) => void, messageBody: any, message: MessageData) {

    try {

        message.Body = getMessageBuffer(messageBody)

        publish(JSON.stringify(message))

    } catch (e) {
        throw e
    }

}


