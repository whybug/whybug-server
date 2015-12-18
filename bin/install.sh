#!/bin/sh
echo "\nInstalling dependencies..."
npm install --unsafe-perm

echo "\nBuilding assets..."
npm run build:frontend
npm run build:server
