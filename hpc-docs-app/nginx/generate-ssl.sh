#!/bin/sh
# Generate self-signed SSL certificate for development/internal use
mkdir -p /etc/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/key.pem \
  -out /etc/nginx/ssl/cert.pem \
  -subj "/C=TH/ST=Khon Kaen/L=Khon Kaen/O=KKU HPC/CN=localhost"
echo "SSL certificate generated successfully"
