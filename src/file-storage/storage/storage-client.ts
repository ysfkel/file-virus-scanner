


export interface StorageClientType {

    ReadDataStreamAsync: (filename: string) => Promise<any>
}

export default class StorageClient implements StorageClientType {

    storageProvider: StorageClientType

    constructor(storageProvider: StorageClientType) {

        if (!storageProvider) {
            throw new Error('Exception, storage client cannot be undefined')
        }
        this.storageProvider = storageProvider;
    }

    async ReadDataStreamAsync(fileName: string): Promise<any> {
        try {
            const stream = await this.storageProvider.ReadDataStreamAsync(fileName)
            return stream
        } catch (e) {
            throw e
        }
    }
} 