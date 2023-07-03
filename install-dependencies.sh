#!/bin/bash

# Instala zip
sudo yum install -y zip

# Instala o OpenJDK 17 (ou outra versão desejada do Java)
sudo amazon-linux-extras enable corretto8
sudo yum install -y java-1.8.0-amazon-corretto-devel

# Instala o Tomcat
sudo yum install -y tomcat

# Para o serviço do Tomcat (caso esteja em execução)
sudo service tomcat stop

# Copia arquivo
aws s3 cp s3://app-gp2-s3/my-application.zip ./my-application.zip

# Extrair o arquivo .zip
unzip -o my-application.zip

# Remove o conteúdo da pasta webapps (opcional, se desejar limpar a implantação anterior)
sudo rm -rf /usr/share/tomcat/webapps/*

# Copia o arquivo .jar para a pasta webapps
sudo cp airBNB-2.0.jar /usr/share/tomcat/webapps/

# Inicia o aplicativo .jar usando o comando java -jar
sudo java -jar /usr/share/tomcat/webapps/airBNB-2.0.jar
