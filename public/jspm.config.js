SystemJS.config({
	baseURL: "/public",
	paths: {
		"client/": "client/"
	},
	transpiler: false,
	packages: {
		"client": {
			"main": "index.js",
			"format": "cjs"
		}
	}
});
