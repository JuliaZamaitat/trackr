# trackr

This is a project using the MEVN stack with Vue 3 and Typescript.

The client and the server need to be handled seperately – each directory has its own package and scripts and needs to be started separately.


## Project setup
```
cd client & npm install
cd server & npm install
```

## Compiles and hot-reloads for development
```
cd client & npm run serve
cd server & npm start
```

## Docker

#### fix permissions in volumes for hot reloading 
- create a file called `.env` in the root directory of the project
- put in your userid (e.g. "UID=1000" without quotes) and on the next line your groupid (e.g. "GID=500" without quotes), you can find out yours by running command `id -u` and `id -g`

#### create a folder for mongoDB to persistently save files 
- create a folder called `data` in the root directory of the project 
- inside the `data` folder create another folder called `mongo`

#### usual docker compose commands
- build the project with `docker compose build`
- run it using `docker compose up -d`
- show logs of the application with `docker compose logs` 
- to stop the containers enter `docker compose down`



## Testing Frontend

### Unit Tests
```
cd client && npm run test:unit
```
### E2E Tests
```
cd client && npm run test:e2e
```

