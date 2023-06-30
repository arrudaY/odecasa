#!/bin/bash

# Iniciar o serviço Docker
sudo service docker start

# Build da imagem Docker
docker build -t app:latest .

# Executar o contêiner Docker
docker run -d -p 8080:8080 app:latest java -jar /usr/local/tomcat/webapps/airBNB-2.0.jar
