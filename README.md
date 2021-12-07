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
- create a folder called `mongo` in the parent directory 
- change into the folder with `cd mongo` and create folder called `data`
- build the project with `docker compose build`
- run it using `docker compose up -d`
- look at the output with `docker compose logs` 
- to stop the containers enter `docker compose down` 
