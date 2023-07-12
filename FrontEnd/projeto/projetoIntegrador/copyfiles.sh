#!/bin/bash

# Change directory to the script's directory
cd "$(dirname "$0")"

# Copy files from source directory to /var/www/html
cp -r proj/* /var/www/html/