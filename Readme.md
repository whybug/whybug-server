# Whybug Server
[![Build Status](https://travis-ci.org/whybug/whybug-server.svg?branch=master)](https://travis-ci.org/whybug/whybug-server)

Requires:

  * nodejs
  * elasticsearch
  * mysql

## Installation

 - Install dependencies with `npm install`.
 - Copy the file `envvars.dist` to `envvars` and change required settings. For a complete list of available environment variables, see `config/config.js`.
 - `npm run knex migrate:latest` run all migrations.

## Useful commands

 * `npm start` starts the server with pm2
 * `npm test` runs tests
 * `npm run watch` recompile javascript on change

#### Migrations

 * `npm run knex migrate:latest` run all migrations
 * `npm run knex migrate:roolback` undo latest migration
 * `npm run knex migrate:make [migration_name]` creates a new migration
