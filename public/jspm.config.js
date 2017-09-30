SystemJS.config({
	baseURL: "/public",
	transpiler: false,
	packages: {
		"client": {
			"main": "index.js",
			"format": "cjs"
		}
	}
});

SystemJS.config({
	packageConfigPaths: [],
	map: {},
	packages: {}
});
