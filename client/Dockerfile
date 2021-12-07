FROM node:17.2

WORKDIR /app
ENV PATH app/node_modules/.bin:$PATH
COPY ./package.json /app/package.json
RUN npm install
COPY . /app
RUN chown -R 1000:1000 /app


USER 1000

ENTRYPOINT ["npm","run", "serve"]