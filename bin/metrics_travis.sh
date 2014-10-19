#!/bin/bash
set -e

if [ -e metrics.csv ]; then
    rm metrics.csv
fi

if [ -e metrics_on_revision.csv ]; then
    rm metrics_on_revision.csv
fi

/bin/bash bin/run-command-on-git-revisions.sh master^ master "sh bin/metrics_on_this_rev.sh >> metrics_on_revision.csv"

git config --global user.email "mail@adrian-philipp.com"
git config --global user.name "Adrian Philipp"
git remote set-url origin "https://${GH_TOKEN}@github.com/whybug/whybug-server.git"

git fetch origin +gh-pages:gh-pages
git checkout gh-pages
cat metrics_on_revision.csv >> metrics.csv
rm metrics_on_revision.csv
git add metrics.csv
git commit -m "Update metrics"
git push origin gh-pages
git checkout master
