#!/bin/bash

# Instala zip
sudo yum install -y zip

# Copia arquivo
aws s3 cp s3://app-gp2-s3/my-application.zip ./my-application.zip

# Extrair o arquivo .zip
unzip -o my-application.zip

# Instalação do Docker
sudo yum install -y docker

# Inicia o serviço docker
sudo service docker start

# Construção da imagem Docker
sudo docker build -t app:latest .

sudo docker run -d -p 8080:8080 app:latest java -jar /usr/local/tomcat/webapps/airBNB-2.0.jar

# Instalação do Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
