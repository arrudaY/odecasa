#!/bin/bash

#login
sudo usermod -aG docker $USER
sudo groupadd docker
sudo service docker restart
sudo chmod +x /usr/local/bin/docker-compose

# Build da imagem Docker
docker build -t app:latest .

# Executar o contêiner Docker
docker run -d -p 8080:8080 app:latest java -jar /usr/local/tomcat/webapps/airBNB-2.0.jar
