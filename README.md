# sacloud-api-tester

[さくらのクラウドのAPI](http://developer.sakura.ad.jp/cloud/api/1.1/)をテストするためのクライアント


## Development

```bash
# Clone this repository
git clone https://github.com/BcRikko/sacloud-api-tester.git

# Setup
npm install

# Build client(localhost:8080)
npm run dev

# Run server(localhost:3000)
npm run server

# Local testing
bash local.sh
```


## Release

Host: CentOS 7.2


### Clone this repository

```bash
# Clone this repository
git clone https://github.com/BcRikko/sacloud-api-tester.git
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
```


### Single Container

```bash
# Install docker (docker-compose, node, npm)
bash setup.sh

# Build image & Run(http://<ipaddress>:8080?apiRoot=localhost)
bash deploy-single.sh

# stop
dockker ps
docker stop <containerid>
```


### Multi-Container

```bash
# Install docker, docker-compose, node, npm
bash setup.sh

# deploy & run(http://<ipaddress>:8080)
bash deploy-multi.sh

# stop
bash stop.sh
```
