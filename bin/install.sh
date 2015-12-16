#!/bin/sh
echo "updating dependencies..."
npm install --unsafe-perm

echo "building assets..."
npm run build:frontend
npm run build:server
