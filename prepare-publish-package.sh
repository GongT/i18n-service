#!/usr/bin/env bash
set -e
set -x

tsc -p src/server
tsc -p src/client
tsc -p src/package

mkdir -p dist/npm-package/

cp -rv package-contents/. dist/npm-package/
