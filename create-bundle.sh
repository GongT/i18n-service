#!/usr/bin/env bash

function bundle {
	[ -e "./public/jspm_packages/bundle/$1.js" ] && return 0
	jspm bundle --skip-rollup --inject --no-mangle --source-map-contents \
			"$1" "./public/jspm_packages/bundle/$1.js"
}

export -f bundle
echo '
Object.keys(require("./package.json").jspm.dependencies).forEach((pkg) => {
	console.log(pkg);
});' | node | xargs -n 1 -I F sh -c 'bundle F'

echo -e "jspm bundle created."
