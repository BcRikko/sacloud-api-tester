FROM nginx

MAINTAINER BcRikko

WORKDIR root

ADD ./app.conf /etc/nginx/conf.d/app.conf

RUN mkdir /root/logs
RUN chmod 755 -R /root

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
