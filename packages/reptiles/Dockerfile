FROM node:16.14.2-alpine

ENV TZ Asia/Shanghai
ENV NODE_ENV=production

RUN apk add --no-cache tzdata
RUN apk add openssh-client

COPY ./dist /app/backstageApi

WORKDIR /app/backstageApi

CMD [ "node", "--enable-source-maps", "index.cjs" ]
