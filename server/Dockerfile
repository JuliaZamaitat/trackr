FROM node:17.2

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV BIND_ADDR=0.0.0.0 PORT=3000
CMD ["npm","start"]


