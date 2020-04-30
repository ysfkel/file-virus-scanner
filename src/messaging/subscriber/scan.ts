

import FileScanner from '../../services/file-scanner'
import MinioProvider from '../../file-storage/storage/minio-provider'
import StorageClient from '../../file-storage/storage/storage-client'
import AntimalwareClient from '../../antimalware/antimalware-client'
import ClamAvProvider from '../../antimalware/clamav-provider'
import { Message } from 'node-nats-streaming'


export function ScanFile(payload: Message): void {
    try {
        console.log('Received message ', payload.getSubject())

        //initialize storage
        const minioProvider = new MinioProvider()
        const storageClient = new StorageClient(minioProvider)
        //initialize antimalware
        const clamAvProvider = new ClamAvProvider()
        const antimalwareClient = new AntimalwareClient(clamAvProvider)
        //initialize scan service
        const scanner = new FileScanner(storageClient, antimalwareClient)
        scanner.ScanFileAsync(payload)

    } catch (e) {
        //write code to handle exection
        console.log(`[SCAN FAILED]:: ${e} ::PAYLOAD:: ${payload}`)
    }
}


