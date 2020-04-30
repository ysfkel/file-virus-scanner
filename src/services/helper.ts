
import { Message } from 'node-nats-streaming'
import { MessageData } from './types'

export function getMessageBody(messageBodyString: string): any {
    try {

        const buff = Buffer.from(messageBodyString, 'base64');
        const buffString = buff.toString();

        const messageBody = JSON.parse(buffString)
        return messageBody

    } catch (e) {
        throw e
    }
}

export function getMessageBuffer(message: any): any {

    try {
        return Buffer.from(JSON.stringify(message)).toString('base64')
    } catch (e) {
        throw e
    }
}