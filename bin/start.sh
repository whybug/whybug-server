#!/bin/sh
# Set working directory to repository root.
cd "$(dirname "$0")"
cd ..

# Wait for services
until nc -z $MYSQL_HOST 3306; do
    echo "$(date) - waiting for mysql..."
    sleep 1
done

echo "Running migrations..."
# mysql -e "CREATE DATABASE IF NOT EXISTS whybug;" -h $MYSQL_HOST
node_modules/.bin/knex --env production --cwd ./ --knexfile config/knexfile.js migrate:latest
echo "done."

echo "Reloading services..."
#varnishd -f /etc/varnish/default.vcl -s malloc,100M -a 0.0.0.0:80 -n whybug 2<&1
#varnishadm -n whybug "ban req.url ~ /" 2<&1
echo "done."

echo "Starting whybug..."
# Using 'naught' to make sure the process keeps running.
: ${NODE_CPU_COUNT:=auto}

# All worker outputs are redirected to STDOUT.
node_modules/.bin/naught start \
    --daemon-mode false \
    --stdout /dev/stdout \
    --stderr /dev/stderr \
    --worker-count $NODE_CPU_COUNT \
    build/server.js

