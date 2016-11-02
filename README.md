# sacloud-api-tester

[さくらのクラウドのAPI](http://developer.sakura.ad.jp/cloud/api/1.1/)をテストするためのクライアント


## Development

```bash
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

CentOS 7.2

```bash
# Clone this repository
git clone https://github.com/BcRikko/sacloud-api-tester.git

# Install docker, docker-compose, node, npm
bash setup.sh

# deploy & run(<ipaddress>:8080)
bash deploy.sh

# stop
bash stop.sh
```
