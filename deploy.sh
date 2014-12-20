#!/bin/sh
# Call in .git/hooks/post-recieve and make executable
# #!/bin/sh
# cd .. && /bin/bash deploy.sh

# Fix to run git commands.
unset GIT_DIR
. ./envvars

echo "updating sources..."
git update-server-info 2<&1
git reset --hard 2<&1

echo "installing:"
bash bin/install.sh

echo "running migrations..."
mysql -e "CREATE DATABASE IF NOT EXISTS whybug;" -h $MYSQL_HOST
. ./envvars && node_modules/.bin/knex --env production --cwd ./ --knexfile config/knexfile.js migrate:latest

echo "reloading services..."
node_modules/.bin/pm2 start server.js -i max 2<&1
node_modules/.bin/pm2 reload all 2<&1
varnishadm -n whybug "ban req.url ~ /" 2<&1

echo "deployment done."
