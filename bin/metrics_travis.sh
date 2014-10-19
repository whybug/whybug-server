#!/bin/bash
set -e

if [ -e metrics.csv ]; then
    rm metrics.csv
fi

if [ -e metrics_on_revision.csv ]; then
    rm metrics_on_revision.csv
fi

/bin/bash bin/run-command-on-git-revisions.sh master^ master "sh bin/metrics_on_this_rev.sh >> metrics_on_revision.csv"

>&2 echo $GIT_NAME
>&2 echo $GIT_EMAIL
>&2 echo $GH_TOKEN

git config --global user.email "mail@adrian-philipp.com"
git config --global user.name "Adrian Philipp"

git fetch origin +gh-pages:gh-pages
git checkout gh-pages
cat metrics_on_revision.csv >> metrics.csv
rm metrics_on_revision.csv
git add metrics.csv
git commit -m "Update metrics"
git push origin gh-pages
git checkout master
