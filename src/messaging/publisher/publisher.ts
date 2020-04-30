

import { GetStreamBroker } from '../broker'
import NATS_STREAMING from 'node-nats-streaming'

export function publisher(topic: string, message: any): void {

    try {
        const stan: NATS_STREAMING.Stan = GetStreamBroker()

        console.log('...publing ', topic)

        stan.publish(topic, message)
    } catch (e) {
        throw e
    }
}
