
import * as minio from 'minio'
import * as configManager from '../../config/config-manager'
import { StorageClientType } from './storage-client'

export default class MinioProvider implements StorageClientType {

    minioClient: minio.Client
    bucket: string
    endPoint: string
    port: number
    accessKey: string
    secretKey: string

    constructor() {

        try {
            this.port = configManager.getMinioPort()
            this.accessKey = configManager.getMinioAccessKey()
            this.bucket = configManager.getMinioBucket()
            this.secretKey = configManager.getMinioSecretKey()
            this.endPoint = configManager.getMinioEndPoint()
            this.minioClient = this.getMinioClient()

        } catch (e) {
            throw e
        }
    }

    async ReadDataStreamAsync(fileName: string): Promise<any> {
        try {
            const stream = await this.minioClient.getObject(this.bucket, fileName)
            return stream
        } catch (e) {
            throw e
        }
    }

    getMinioClient(): minio.Client {
        try {
            const minioClient = new minio.Client({
                endPoint: this.endPoint,
                port: this.port,
                useSSL: true,
                accessKey: this.accessKey,
                secretKey: this.secretKey
            });
            return minioClient
        } catch (e) {
            throw e
        }
    }



}