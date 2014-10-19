#!/bin/bash
set -e

if [ -e metrics.csv ]; then
    rm metrics.csv
fi

run-command-on-git-revisions $1 $2 "sh bin/metrics_on_this_rev.sh >> metrics.csv"
