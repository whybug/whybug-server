# Whybug Server
[![Build Status](https://travis-ci.org/whybug/whybug-server.svg?branch=master)](https://travis-ci.org/whybug/whybug-server)

Requires:

  * nodejs
  * elasticsearch
  * mysql

## Installation

 - Install dependencies with `npm install`.
 - Copy the file `.env.example` to `.env` and change required settings. For a complete list of available environment variables, see `config/config.js`.
 - `npm run knex migrate:latest` run all migrations.

## Useful commands

 * `npm start` starts the development environment, go to [http://127.0.0.1:8000]()
 * `npm run build` creates build files for prodution
 * `npm run prod` starts the server with pm2
 * `npm test` runs tests

#### Migrations

 * `npm run knex migrate:latest` run all migrations
 * `npm run knex migrate:rollback` undo latest migration
 * `npm run knex migrate:make [migration_name]` creates a new migration

### Glossary

 - `Controller`

    > A Controller is a component that contains logic and fetch data, also
    called a _smart components_ while a others are a _dump component_,
    receiving all data via properties.
