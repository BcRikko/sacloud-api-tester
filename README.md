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

Host: CentOS 7.2

### Single Container

```bash
# Clone this repository
git clone https://github.com/BcRikko/sacloud-api-tester.git

# Install docker (docker-compose, node, npm)
bash setup.sh

# Build image & Run(http://<ipaddress>:8080?apiRoot=localhost)
bash setup-single.sh

# stop
dockker ps
docker stop <containerid>
```


### Multi-Container

```bash
# Clone this repository
git clone https://github.com/BcRikko/sacloud-api-tester.git

# Install docker, docker-compose, node, npm
bash setup.sh

# deploy & run(http://<ipaddress>:8080)
bash deploy-multi.sh

# stop
bash stop.sh
```
