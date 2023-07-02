#!/bin/bash

# Acesso usuario docker para remover
sudo usermod -aG docker $USER

# Interrompe todos os containers Docker em execução
containers=$(docker ps -aq)
if [ -n "$containers" ]; then
    docker stop $containers
fi

# Remove todos os containers Docker em execução
if [ -n "$containers" ]; then
    docker rm $containers
fi

# Remove todas as imagens Docker
images=$(docker images -aq)
if [ -n "$images" ]; then
    docker rmi $images
fi

# Remove versão antiga
rm airBNB-2.0.jar
