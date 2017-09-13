#!/usr/bin/env bash
set -e
set -x

ncu -a -u
cd package-contents/
ncu -a -u
cd ..

rm -rf dist/npm-package/
mkdir -p dist/npm-package/
cp -rv package-contents/. dist/npm-package/

tsc -p src/server
tsc -p src/client
tsc -p src/package
