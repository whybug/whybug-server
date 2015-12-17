#!/bin/sh
echo "Running migrations..."
#mysql -e "CREATE DATABASE IF NOT EXISTS whybug;" -h $MYSQL_HOST
#node_modules/.bin/knex --env production --cwd ./ --knexfile config/knexfile.js migrate:latest

echo "Reloading services..."
#varnishd -f /etc/varnish/default.vcl -s malloc,100M -a 0.0.0.0:80 -n whybug 2<&1
#varnishadm -n whybug "ban req.url ~ /" 2<&1

echo "Starting whybug..."
node build/server.js

