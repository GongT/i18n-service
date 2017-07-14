#!/usr/bin/env bash
set -e
set -x

sh prepare-publish-package.sh

cd dist/npm-package
npm publish --access public
