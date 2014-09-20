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

echo "updating dependencies..."
npm install

echo "running migrations..."
. ./envvars && node_modules/.bin/knex --env production --cwd ./ --knexfile config/knexfile.js migrate:latest

echo "building assets..."
node_modules/.bin/webpack --config config/webpack.config.js -p 2<&1

echo "reloading services..."
node_modules/.bin/pm2 reload whybug 2<&1
node_modules/.bin/pm2 updatePM2
varnishadm "ban req.url ~ /" 2<&1

echo "deployment done."
exit;
