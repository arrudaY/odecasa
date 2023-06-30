#!/bin/bash

# Acesso usuario docker para remover
sudo usermod -aG docker $USER

# Interrompe todos os containers Docker em execução
docker stop $(docker ps -a -q)

# Remove todos os containers Docker em execução
docker rm $(docker ps -a -q)

# Remove todas as imagens Docker
docker rmi $(docker images -q)

# Exclui o arquivo .jar do diretório local
sudo rm airBNB-2.0.jar
