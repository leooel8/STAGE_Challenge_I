FROM node:latest

#set directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#metadata
LABEL maintainer="Leo Ressayre" \
      name="iota_helloword" \
      version="0.1"

#Install packages
RUN apt update -y
RUN apt upgrade -y
# COPY package.jason /usr/src/app/
COPY package-lock.json /usr/src/app/

COPY . /usr/src/app

RUN npm install

#run project
CMD [ "node", "index.js"]
