#!/bin/sh

echo "updating dependencies..."
npm install --unsafe-perm

echo "building assets..."
node_modules/.bin/webpack --config config/webpack.config.js -p 2<&1

