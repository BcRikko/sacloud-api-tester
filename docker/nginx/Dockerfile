FROM nginx

MAINTAINER BcRikko

ADD ./app.conf /etc/nginx/conf.d/app.conf

RUN mkdir /root/logs
RUN chmod 755 -R /root
RUN chmod 400 /etc/nginx/keys/server.key

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
