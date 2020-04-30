FROM node:10.13.0-alpine as builder

WORKDIR /raw
COPY package.json .
COPY tsconfig.json .
RUN npm install
ADD ./src /raw/src
RUN npm run build  

#build distribution image
FROM node:10.13.0-alpine

WORKDIR /app
COPY --from=builder /raw/build ./build 
COPY --from=builder /raw/node_modules ./node_modules
COPY package.json .
CMD ["npm","start"] 