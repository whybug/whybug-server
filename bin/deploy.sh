#!/bin/sh
# Call in .git/hooks/post-recieve and make executable
# #!/bin/sh
# cd .. && /bin/bash deploy.sh

# Fix to run git commands.
unset GIT_DIR
. ./.env

echo "updating sources..."
git update-server-info 2<&1
git reset --hard 2<&1

echo "installing:"
bash bin/install.sh

echo "deployment done."
