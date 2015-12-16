#!/bin/sh
echo "Installing dependencies..."
npm install --unsafe-perm

echo "Building assets..."
npm run build:frontend
npm run build:server
