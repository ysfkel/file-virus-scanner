# Antimalware Microservice

Antimalware microservice is responsible for
- Scanning files for malicious code

## Dependencies

- Nodejs  
- Typescript 


## Request <> Response Flow

subscriber --> service --> publisher

## Environment Variables

| variable        | Meaning           |
| ------------- |:-------------:|
| MINIO_ENDPOINT      | IP address for minio server |
| MINIO_PORT      | Port at which minio server is listening  |
| MINIO_ACCESS_KEY      | Minio server access key  |
| MINIO_SECRET_KEY      | Minio server secret key   |
| MINIO_BUCKET      | Minio server bucket name for storing files |
| CLAMAV_PORT      | Port at which clamav server is listening |
| CLAMAV_ENDPOINT      | Port at which clamav  server is listening|
| MESSAGE_BROKER_ENDPOINT      | IP address for Message broker server |
| MESSAGE_BROKER_PORT      | Port at which message broker  is listening |
| MESSAGE_BROKER_CLUSTER_ID | cluster ID of NATS_STREAMING cluster
| MESSAGE_BROKER_USE_SSLMODE | Specififies if message broker runs in SSL mode. accepted values are `true` and `false`. false is used if no value is provided
| MESSAGE_BROKER_CERTIFICATE_PATH | Path to message broker certificate eg certs/cert.pem
| MESSAGE_BROKER_KEY_PATH | Path to message broker key eg certs/key.pem
| MESSAGE_BROKER_CERTIFICATE_AUTHORITY_PATH | Path to message broker Certificate Authority eg certs/ca.pem

## Build

to build the service, simply run npm run build




