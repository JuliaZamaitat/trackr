FROM node:17.2

RUN npm install -g node-gyp
RUN apt-get update && \
apt-get install -y python2 make gcc g++

WORKDIR /app
ENV PATH app/node_modules/.bin:$PATH
COPY ./package.json /app/package.json
RUN npm install
COPY . /app

USER 1000

ENTRYPOINT ["npm","run", "serve"]