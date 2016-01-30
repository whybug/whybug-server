#!/usr/bin/env bash

# Make a new machine for whybug (parallels is OSX only)
if ! docker-machine inspect whybug >/dev/null; then
    docker-machine create --driver=parallels whybug
fi

# Configure env variables for docker
# (fish shell, run the env command to get a custom one for your shell)
eval $(docker-machine env whybug >/dev/null)

cd config/
docker-compose up

