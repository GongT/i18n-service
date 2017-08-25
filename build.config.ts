/// <reference path="./.jsonenv/_current_result.json.d.ts"/>
import {JsonEnv} from "@gongt/jenv-data";
import {EPlugins, MicroBuildConfig} from "./.micro-build/x/microbuild-config";
import {MicroBuildHelper} from "./.micro-build/x/microbuild-helper";
declare const build: MicroBuildConfig;
declare const helper: MicroBuildHelper;
/*
 +==================================+
 |  **DON'T EDIT ABOVE THIS LINE**  |
 | THIS IS A PLAIN JAVASCRIPT FILE  |
 |   NOT A TYPESCRIPT OR ES6 FILE   |
 |    ES6 FEATURES NOT AVAILABLE    |
 +==================================+
 */

/* Example config file */

const projectName = 'i18n';

build.baseImage('node', 'alpine');
build.projectName(projectName);
build.domainName(projectName + '.' + JsonEnv.baseDomainName);

build.isInChina(JsonEnv.gfw.isInChina, JsonEnv.gfw);
build.npmCacheLayer(JsonEnv.gfw.npmRegistry);
build.npmInstall('./package.json', ['make', 'g++', 'python']);
build.forceLocalDns(true);

build.forwardPort(80, 'tcp');
build.listenPort(3818);

build.startupCommand('./node_modules/.bin/ts-app-loader');
build.shellCommand('/usr/local/bin/node');
build.environmentVariable('MAIN_FILE', './dist/server/index.js');

build.addPlugin(EPlugins.jenv);

build.addPlugin(EPlugins.typescript, {
	source: 'src/server',
	target: 'dist',
});
build.addPlugin(EPlugins.typescript, {
	source: 'src/package',
	target: 'dist/npm-package',
});
build.addPlugin(EPlugins.typescript, {
	source: 'src/client',
	target: 'public/client',
});
build.addPlugin(EPlugins.jspm_bundle, {
	build: false,
	source: './public/client/index.js',
	packageJson: './package.json',
	externals: ['@gongt/ts-stl-library', '@gongt/ts-stl-client'],
});

// build.volume('translations', '/data/translations');

build.onConfig((isBuild) => {
});
