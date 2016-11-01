FROM nginx

MAINTAINER BcRikko

ADD ./app.conf /etc/nginx/conf.d/app.conf

RUN chmod 755 -R /root

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
