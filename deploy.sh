#!/bin/sh
# Call in .git/hooks/post-recieve and make executable
# #!/bin/sh
# cd ..
# /bin/bash deploy.sh

pwd

echo "*** $USER: updating server info..."
git update-server-info 2<&1

echo "*** $USER: updating sources..."
git reset --hard 2<&1

echo "*** $USER: updating dependencies..."
npm install

echo "*** $USER: restarting nodejs..."
# Todo: use cluster.js and send a signal to reload,
/usr/bin/pkill -f '/usr/bin/node /home/whybug/whybug-server/server.js'
/usr/bin/node /home/whybug/whybug-server/server.js 2<&1 > node-debug.log &

echo "*** $USER: deployment done ***"
