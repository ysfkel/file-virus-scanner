
import NATS from 'nats'
import { subscribeAll } from './broker'

export function Start() {
    try {
        subscribeAll()
    } catch (e) {
        console.log("[ERROR] COULD NOT SUBSCRIBE", e)
        throw e
    }
}
