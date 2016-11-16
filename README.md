# sacloud-api-tester

[さくらのクラウドのAPI](http://developer.sakura.ad.jp/cloud/api/1.1/)をテストするためのクライアント


## Development

```bash
# Clone this repository
git clone https://github.com/BcRikko/sacloud-api-tester.git
cd sacloud-api-tester

# Client setup
cd app
npm install

# Build client(localhost:8080)
npm run dev

# Server setup
cd ../server

# Run server(localhost:3000)
npm run server
```


## Release

Host: CentOS 7.2


### Clone this repository

```bash
# Clone this repository
git clone https://github.com/BcRikko/sacloud-api-tester.git
cd sacloud-api-tester
```


### Create Self-signed certificate

```bash
# If mod_ssl is not installed
yum install mod_ssl -y

# Create Self-signed certificate
cd keys

# Create private key
openssl genrsa 2048 > server.key
# Create certificate signing request
openssl req -new -key server.key > server.csr
# Create server certificate
openssl x509 -in server.csr -days 30 -req -signkey server.key > server.crt

cd ..
```


### Deploy

```bash
# Install docker, docker-compose, node, npm
bash ./script/setup.sh

# deploy & run(https://<ipaddress>)
bash ./script/deploy-multi.sh

# stop
bash ./script/stop.sh
```
