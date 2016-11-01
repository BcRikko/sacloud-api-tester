FROM node

MAINTAINER BcRikko

ADD package.json /root/server

WORKDIR /root/server

RUN npm install

ENV NODE_ENV production

CMD ["node", "server.js"]
