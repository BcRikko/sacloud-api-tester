#!/bin/bash

chmod 400 ./keys/server.key

cd app
npm install
npm run build

cd ../server
npm install

cd ../docker
docker-compose up -d
