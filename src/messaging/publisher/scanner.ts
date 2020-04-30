

import { publisher } from './publisher'

export function publishFileScanOk(message: any) {
    try {
        publisher('bpaas.file_scan.scan.ok', message)
    } catch (e) {
        throw e
    }
}

export function publishFileScanMaliciuos(message: any) {
    try {
        publisher('bpaas.file_scan.scan.malicious', message)
    } catch (e) {
        throw e
    }
}


export function publishFileScanFailed(message: any) {
    try {
        publisher('bpaas.file_scan.scan.failed', message)
    } catch (e) {
        throw e
    }
}
