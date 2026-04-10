FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 777 /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 777 /etc/nginx/conf.d
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]