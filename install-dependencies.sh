#!/bin/bash

# Instala zip
sudo yum install -y zip

# Instala o OpenJDK 17 (ou outra versão desejada do Java)
sudo yum install -y java-1.8.0-amazon-corretto-devel

# Instala o Tomcat
sudo dnf -y install wget
wget https://archive.apache.org/dist/tomcat/tomcat-10/v10.0.23/bin/apache-tomcat-10.0.23.tar.gz
tar -xvf apache-tomcat-10*.tar.gz
sudo mv apache-tomcat-10.0.23 /usr/local/tomcat
sudo useradd -r -m -U -d /usr/local/tomcat -s /bin/false tomcat
sudo chown -R tomcat: /usr/local/tomcat

# Configure as variáveis de ambiente do Tomcat
echo "export CATALINA_HOME=\"/usr/local/tomcat\"" | sudo tee -a /etc/profile.d/tomcat.sh
echo "export JAVA_HOME=\"/usr/lib/jvm/java\"" | sudo tee -a /etc/profile.d/tomcat.sh
source /etc/profile.d/tomcat.sh

# Inicie o Tomcat
sudo su - tomcat -c "$CATALINA_HOME/bin/startup.sh"

# Copia arquivo
aws s3 cp s3://app-gp2-s3/my-application.zip ./my-application.zip

# Extrair o arquivo .zip
unzip -o my-application.zip

# Remove o conteúdo da pasta webapps (opcional, se desejar limpar a implantação anterior)
sudo rm -rf $CATALINA_HOME/webapps/*

# Copia o arquivo .jar para a pasta webapps
sudo cp airBNB-2.0.jar $CATALINA_HOME/webapps/

# Reinicia o Tomcat
sudo su - tomcat -c "$CATALINA_HOME/bin/shutdown.sh"
sudo su - tomcat -c "$CATALINA_HOME/bin/startup.sh"
