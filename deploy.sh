#!/bin/sh
# stick in .git/hooks/post-update and make executable

echo "*** $USER: updating server info..."
git update-server-info 2<&1

echo "*** $USER: updating sources..."
git reset --hard 2<&1

echo "*** $USER: restarting nodejs..."
/usr/bin/pkill -f '/usr/bin/node /home/whybug/whybug-server/server.js'
/usr/bin/node /home/whybug/whybug-server/server.js 2<&1 &

echo "*** $USER: deployment done ***"
