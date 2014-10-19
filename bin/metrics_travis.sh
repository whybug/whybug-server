#!/bin/bash
set -e

if [ -e metrics.csv ]; then
    rm metrics.csv
fi

if [ -e metrics_on_revision.csv ]; then
    rm metrics_on_revision.csv
fi

sh bin/run-command-on-git-revisions.sh master^ master "sh bin/metrics_on_this_rev.sh >> metrics_on_revision.csv"

git checkout gh-pages
cat metrics_on_revision.csv >> metrics.csv
git add metrics.csv
git commit -m "Update metrics"
git push origin gh-pages
