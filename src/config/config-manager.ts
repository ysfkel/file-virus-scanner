

const CLIENT_ID = "antimalware"

export function getMinioEndPoint(): string {
    if (!process.env.MINIO_ENDPOINT) {
        const msg = "Fatal invalid MINIO_ENDPOINT "
        console.log(msg)
        throw new Error(msg)
    }
    return process.env.MINIO_ENDPOINT
}

export function getMinioAccessKey(): string {
    if (!process.env.MINIO_ACCESS_KEY) {
        const msg = "Fatal invalid MINIO_ACCESS_KEY "
        console.log(msg)
        throw new Error(msg)
    }
    return process.env.MINIO_ACCESS_KEY
}

export function getMinioSecretKey(): string {
    if (!process.env.MINIO_SECRET_KEY) {
        const msg = "Fatal invalid MINIO_SECRET_KEY"
        console.log(msg)
        throw new Error(msg)
    }
    return process.env.MINIO_SECRET_KEY as string
}

export function getMinioBucket(): string {
    if (!process.env.MINIO_BUCKET) {
        const msg = "Fatal invalid MINIO_BUCKET"
        console.log(msg)
        throw new Error(msg)
    }
    return process.env.MINIO_BUCKET as string
}

export function getMinioPort(): number {
    try {
        if (!process.env.MINIO_PORT) {
            const msg = "Fatal invalid MINIO_PORT"
            console.log(msg)
            throw new Error(msg)
        }

        const port = parseInt(process.env.MINIO_PORT)

        return port
    } catch (e) {
        throw e
    }
}

export function getClamAvPort(): number {
    try {
        if (!process.env.CLAMAV_PORT) {
            const msg = "Fatal invalid CLAMAV_PORT"
            console.log(msg)
            throw new Error(msg)
        }
        const port = parseInt(process.env.CLAMAV_PORT)

        return port

    } catch (e) {
        throw e
    }
}

export function getClamEndPoint(): string {
    if (!process.env.CLAMAV_ENDPOINT) {
        const msg = "Fatal invalid CLAMAV_ENDPOINT"
        console.log(msg)
        throw new Error(msg)
    }
    return process.env.CLAMAV_ENDPOINT
}

export function getMessageBrokerEndPoint(): string {
    if (!process.env.MESSAGE_BROKER_ENDPOINT) {
        const msg = "Fatal invalid MESSAGE_BROKER_ENDPOINT"
        console.log(msg)
        throw new Error(msg)
    }
    return process.env.MESSAGE_BROKER_ENDPOINT
}

export function getMessageBrokerPort(): number {
    try {
        if (!process.env.MESSAGE_BROKER_PORT) {
            const msg = "Fatal invalid MESSAGE_BROKER_PORT"
            console.log(msg)
            throw new Error(msg)
        }
        const port = parseInt(process.env.MESSAGE_BROKER_PORT as string)
        return port
    } catch (e) {
        throw e
    }
}

export function getMessageBrokerURL(): string {
    try {
        const endpoint: string = getMessageBrokerEndPoint()
        const port: number = getMessageBrokerPort()
        const url = `${endpoint}:${port}`
        return url
    } catch (e) {
        throw e
    }
}

export function getMessageBorkerClusterID(): string {
    try {
        if (!process.env.MESSAGE_BROKER_CLUSTER_ID) {
            const msg = "Fatal invalid MESSAGE_BROKER_CLUSTER_ID"
            console.log(msg)
            throw new Error(msg)
        }
        const cluster_id = process.env.MESSAGE_BROKER_CLUSTER_ID as string
        return cluster_id
    } catch (e) {
        throw e
    }
}

export function getClientID(): string {
    return CLIENT_ID
}

//

export function getMessageBrokerSSLMODE(): boolean {

    if (process.env.MESSAGE_BROKER_USE_SSLMODE === "true") {
        return true
    } else {
        return false
    }

}

export function getMessageBrokerCertifcatePath(): string {

    if (getMessageBrokerSSLMODE() && !process.env.MESSAGE_BROKER_CERTIFICATE_PATH) {
        throw new Error("ERROR: env MESSAGE_BROKER_CERTIFICATE_PATH cannot be undefine if env MESSAGE_BROKER_SSLMODE is true")
    }
    return process.env.MESSAGE_BROKER_CERTIFICATE_PATH as string
}

export function getMessageBrokerKeyPath(): string {

    if (getMessageBrokerSSLMODE() && !process.env.MESSAGE_BROKER_KEY_PATH) {
        throw new Error("ERROR: env MESSAGE_BROKER_KEY_PATH cannot be undefine if env MESSAGE_BROKER_SSLMODE is true")
    }
    return process.env.MESSAGE_BROKER_KEY_PATH as string

}

export function getMessageBrokerCertificateAuthorityPath(): string {

    if (getMessageBrokerSSLMODE() && !process.env.MESSAGE_BROKER_CERTIFICATE_AUTHORITY_PATH) {
        throw new Error("ERROR: env MESSAGE_BROKER_CERTIFICATE_AUTHORITY_PATH cannot be undefine if env MESSAGE_BROKER_SSLMODE is true")
    }
    return process.env.MESSAGE_BROKER_CERTIFICATE_AUTHORITY_PATH as string
}


