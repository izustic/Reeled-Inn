FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn tsc

RUN apk add --no-cache --virtual .build-deps gcc musl-dev openssl-dev && \
    apk add --no-cache mongodb-tools && \
    apk del .build-deps

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

ENV MONGODB_URI=mongodb+srv://izustic:12345@reeledinn.ila2lwt.mongodb.net/test

ENV JWT_SECRET=insertyourown

USER appuser

CMD ["node", "bin/www"]

EXPOSE 3000



