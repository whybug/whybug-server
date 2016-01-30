# Whybug Server
[![Build Status](https://travis-ci.org/whybug/whybug-server.svg?branch=master)](https://travis-ci.org/whybug/whybug-server)
[![Docker Repository on Quay](https://quay.io/repository/whybug/whybug-server/status "Docker Repository on Quay")](https://quay.io/repository/whybug/whybug-server)

Requires:

  * Nodejs 4.x and npm
  * Elasticsearch
  * Mysql

## Development

### Local Docker installation

For development it is best to start the node application on the host and
and access all dependencies in docker. This requires `docker-machine` and
`docker-compose` [to be installed](https://docs.docker.com/mac/step_one/).

    # start everything up
    ./bin/start-osx.sh


### Manual development installation

First install all required software, then run:

    git clone https://github.com/whybug/whybug-server.git
    cd whybug-server

    # Copy the file `.env.example` to `.env` and change required settings.
    # For a complete list of available environment variables, see `config/config.js`.
    cp .env.example .env

    # Start a server with hot reloading enabled
    npm start

    open http://127.0.0.1:8000

Useful commands:

 * `npm start` starts the development environment, go to [http://127.0.0.1:8000]()
 * `npm run build:frontend` creates build files in `./build` for production
 * `npm run build:server` creates build file in `./build` for production
 * `npm test` runs tests

## Production installation

There is a docker image available, for an example usage see
[whybug-rancher](https://github.com/whybug/whybug-rancher) .

 * `docker run -p 8000:8000 -i quay.io/whybug/whybug-server:latest` run whybug-server image
 * `docker pull quay.io/whybug/whybug-server:latest`  get the latest image
 * `docker build -t quay.io/whybug/whybug-server .` build image locally

## Migrations

 * `npm run knex migrate:latest` run all migrations
 * `npm run knex migrate:rollback` undo latest migration
 * `npm run knex migrate:make [migration_name]` creates a new migration

## Glossary

 - `Controller`

    > A Controller is a component that contains logic and fetch data, also
    called a _smart components_ while a others are a _dump component_,
    receiving all data via properties.
