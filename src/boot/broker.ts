
import * as subscribers from '../messaging/subscriber/scan'
import { GetStreamBroker } from '../messaging/broker'
import { Message } from 'node-nats-streaming'
import { getClientID } from '../config/config-manager'

export function subscribeAll() {
    subscribeStreaming('bpaas.file_scan.scan', subscribers.ScanFile)
}

function subscribeStreaming(topic: string, handler: (message: Message) => void) {
    const stan = GetStreamBroker()
    stan.on('connect', () => {
        console.log('...connected to message broker successfully')
        const opts = stan.subscriptionOptions().setStartWithLastReceived();
        opts.durableName = getClientID()

        const subscription = stan.subscribe(topic, opts);
        subscription.on('message', handler)
    })

}
