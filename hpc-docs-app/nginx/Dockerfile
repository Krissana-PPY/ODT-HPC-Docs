FROM nginx:alpine

RUN apk add --no-cache openssl

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Generate self-signed SSL cert at build time
RUN mkdir -p /etc/nginx/ssl && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
      -keyout /etc/nginx/ssl/key.pem \
      -out /etc/nginx/ssl/cert.pem \
      -subj "/C=TH/ST=Khon Kaen/L=Khon Kaen/O=KKU HPC/CN=localhost"

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
