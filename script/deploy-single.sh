#!/bin/bash
docker build -t sacloud-api-tester .
docker run -d -p 80:80 -p 443:443 sacloud-api-tester
