FROM node:17.2

WORKDIR /app
ENV PATH app/node_modules/.bin:$PATH
COPY ./package.json /app/package.json
RUN npm install

COPY . /app

USER 1000
ENV BIND_ADDR=0.0.0.0 PORT=3000

ENTRYPOINT ["npm","start"]