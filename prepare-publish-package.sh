#!/usr/bin/env bash
set -e

tsc -p server

mkdir -p dist/npm-package/

cp package/{package.json,README.md} dist/npm-package/
