#!/bin/bash

# CentOS 7.x
yum update -y

# Install Docker
tee /etc/yum.repos.d/docker.repo <<-'__EOF__'
[dockerrepo]
name=Docker Repository
baseurl=https://yum.dockerproject.org/repo/main/centos/7/
enabled=1
gpgcheck=1
gpgkey=https://yum.dockerproject.org/gpg
__EOF__

yum install docker-engine -y
systemctl enable docker.service
systemctl start docker

# Install docker-compose
curl -L "https://github.com/docker/compose/releases/download/1.8.1/docker-compose-$(uname -s)-$(uname -m)" > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose


# Install node + npm
curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
yum install nodejs -y
