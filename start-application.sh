#!/bin/bash

#login
sudo service docker start
sudo usermod -aG docker $USER

# Executa o contêiner Docker
sudo docker run -d -p 8080:8080 app:latest java -jar /usr/local/tomcat/webapps/airBNB-2.0.jar
