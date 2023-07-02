#!/bin/bash

# Acesso usuario docker para remover
sudo usermod -aG docker $USER

# Interrompe todos os containers Docker em execução
docker ps -aq && docker stop $(docker ps -aq)

# Remove todos os containers Docker em execução
docker ps -aq && docker rm $(docker ps -aq)

# Remove todas as imagens Docker
docker images -aq && docker rmi $(docker images -aq)

# Remove versão antiga
rm airBNB-2.0.jar
