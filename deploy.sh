#!/bin/bash

npm install
npm run build

cd docker
docker-compose up -d
