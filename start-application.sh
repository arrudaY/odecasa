#!/bin/bash

#login
sudo service docker start
sudo usermod -aG docker $USER

# Executar o contêiner Docker
docker run -d -p 8080:8080 app:latest
