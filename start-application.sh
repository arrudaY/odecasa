#!/bin/bash

# Imprimir o diretório atual
pwd

#
ls

# Executar o contêiner Docker
docker run -d -p 8080:8080 app:latest java -jar /usr/local/tomcat/webapps/airBNB-2.0.jar
