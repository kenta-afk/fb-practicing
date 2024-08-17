FROM mysql:latest

ENV MYSQL_DATABASE sample_db
ENV MYSQL_USER sample_user
ENV MYSQL_PASSWORD sample_password
ENV TZ "Asia/Tokyo"
ENV MYSQL_ROOT_PASSWORD p@assw0rd

COPY ./init.sql /docker-entrypoint-initdb.d/init.sql
