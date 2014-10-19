#!/bin/bash
set -e
rev=`git log -1 --pretty='format:%h' HEAD`

# Unused variables
unused_variables=`node_modules/.bin/webpack --config config/webpack.config.js -p 2<&1 \
    | grep "Side effects in initialization of unused variable" \
    | wc -l `
echo $rev,"js_unused",$unused_variables

# build/js/bundle.js size
size=`du -k build/js/bundle.js | awk '{print $1}'`
echo $rev,"js_size_kb",$size

# server startup time
# build/css/main.css size
