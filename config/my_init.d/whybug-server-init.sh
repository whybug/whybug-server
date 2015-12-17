#!/bin/bash

# todo:
# - run migrations
# - startup services

#whybug_git() {
#    git clone --depth=1 https://github.com/whybug/whybug-server.git /opt/whybug-server
#}

#if [[ "$USE_GIT" == "true" && "$GIT_USER" && "$GIT_PASS" && "$GIT_REPO" ]]
#then
#    whybug_git
#else
#    whybug_http
#fi
# For now use git
#whybug_git

# == Configuration section

# Queue jobs for later execution while configuration is being sorted out
#atd

# Check for `config.php`. If it doesn't exist, use `config.php.default`,
# substituting SQL credentials with observium/"random".
#if [ -f /config/config.php ]; then
#  echo "Using existing PHP database config file."
#  echo "/opt/observium/discovery.php -u" | at -M now + 1 minute
#else
#  echo "Loading PHP config from default."
#  mkdir -p /config/databases
#  cp /opt/observium/config.php.default /config/config.php
#  chown nobody:users /config/config.php
#  PW=$(date | sha256sum | cut -b -31)
#  if [ -n "${OBSERVIUM_MYSQL_1_ENV_MYSQL_PASSWORD+1}" ]; #if isset
#     then echo "using docker-compose";
#          PW=$OBSERVIUM_MYSQL_1_ENV_MYSQL_PASSWORD;
#          sed -i -e "s/localhost/dockerobservium_observium_mysql_1/g" /config/config.php;
#     else echo "PW is set to '$PW'"; fi
#
#  sed -i -e 's/PASSWORD/'$PW'/g' /config/config.php
#  sed -i -e 's/USERNAME/observium/g' /config/config.php
#fi

#ln -s /config/config.php /opt/observium/config.php

#if we are in compose mode we create a first admin user
#if [ -n "${OBSERVIUM_USER+1}" ];
#    then
#         #we need to init the database first
#         /opt/whybug/discovery.php -h all;
#         #now we add a new user at level 10 admin
#         /opt/observium/adduser.php $OBSERVIUM_USER $OBSERVIUM_PASSWORD 10
#fi

/opt/whybug-server/bin/start.sh
