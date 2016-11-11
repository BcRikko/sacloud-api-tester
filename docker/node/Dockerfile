FROM node

MAINTAINER BcRikko

WORKDIR /root

ADD ./key/server.crt /root/server/keys/server.crt
ADD ./key/server.key /root/server/keys/server.key

RUN npm install

ENV NODE_ENV production

CMD ["node", "./server/server.js"]
