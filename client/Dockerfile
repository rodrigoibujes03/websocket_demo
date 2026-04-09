FROM nginx:alpine
COPY . /usr/share/nginx/html
RUN sed -i 's/listen 80;/listen 8080;/' /etc/nginx/conf.d/default.conf
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 777 /var/cache/nginx /var/run /var/log/nginx
EXPOSE 8080