FROM node

MAINTAINER BcRikko

WORKDIR /root/server

RUN npm install pm2 -g

ENV NODE_ENV production

CMD ["pm2-docker", "/root/server/server.js"]
