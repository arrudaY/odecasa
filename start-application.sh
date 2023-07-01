#!/bin/bash

sudo chmod +x /usr/local/bin/docker-compose

sudo usermod -aG docker ec2-user

# Criação do docker-compose.yml
cat <<EOF > docker-compose.yml
version: '3'
services:
  tomcat:
    build: .
    ports:
      - 8080:8080
EOF

# Criação do Dockerfile
cat <<EOF > Dockerfile
FROM tomcat:jdk17
COPY ./airBNB-2.0.jar /usr/local/tomcat/webapps/airBNB-2.0.jar
CMD ["catalina.sh", "run"]
EOF

# Build da imagem Docker
docker build -t app:latest .

#
ls

# Executar o contêiner Docker
docker run -d -p 8080:8080 app:latest java -jar /usr/local/tomcat/webapps/airBNB-2.0.jar
