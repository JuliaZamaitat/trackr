FROM node:17.2

USER 1000
#RUN mkdir /app
ENV PATH app/node_modules/.bin:$PATH
#COPY ./package.json /app/package.json
COPY --chown=1000:1000 . /app
WORKDIR /app
RUN npm install

ENV BIND_ADDR=0.0.0.0 PORT=3000
ENTRYPOINT ["npm","start"]

