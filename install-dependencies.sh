#!/bin/bash

#Instala zip
yum install -y zip

#Copia arquivo
aws s3 cp s3://app-gp2-s3/my-application.zip ./my-application.zip

# Extrair o arquivo .zip
unzip my-application.zip

# Instalação do Docker
yum install -y docker
service docker start

# Instalação do Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

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

# Executar o contêiner Docker
docker run -d -p 8080:8080 app:latest java -jar /usr/local/tomcat/webapps/airBNB-2.0.jar