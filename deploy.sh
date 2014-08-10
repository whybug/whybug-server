#!/bin/sh
# Call in .git/hooks/post-recieve and make executable
# #!/bin/sh
# cd .. && /bin/bash deploy.sh

# Fix to run git commands.
unset GIT_DIR

echo "updating sources..."
git update-server-info 2<&1
git reset --hard 2<&1

echo "updating dependencies..."
npm install

echo "building assets..."
node_modules/.bin/webpack --config config/webpack.config.js -p 2<&1

echo "reloading services..."
node_modules/.bin/pm2 reload whybug 2<&1
varnishadm "ban req.url ~ /" 2<&1

echo "deployment done."
exit;
