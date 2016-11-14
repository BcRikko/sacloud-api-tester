FROM ubuntu

RUN apt update -y
RUN apt install git curl nginx npm nodejs -y

RUN npm cache clean
RUN npm update npm -g
RUN npm install n -g

RUN n stable
RUN ln -sf /usr/local/bin/node /usr/bin/node

# Client
ADD ./app /root/web
ADD ./docker/nginx/app.conf /etc/nginx/conf.d/app.conf
ADD ./keys/server.crt /etc/nginx/keys/server.crt
ADD ./keys/server.key /etc/nginx/keys/server.key
WORKDIR /root/web
RUN npm install
RUN npm run build

RUN mkdir /root/www
RUN cp -R ./dist/. /root/www

# Server
ADD ./server /root/app
ADD ./keys/server.crt /root/app/keys/server.crt
ADD ./keys/server.key /root/app/keys/server.key
WORKDIR /root/app
RUN npm install


RUN mkdir /root/logs

RUN chmod -R 755 /root
RUN chmod 400 /etc/nginx/keys/server.key

ENV NODE_ENV production
CMD ["node", "./server.js"]

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
