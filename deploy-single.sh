#!/bin/bash
docker build -t sacloud-api-tester .
docker run -d -p 8080:8080 sacloud-api-tester
