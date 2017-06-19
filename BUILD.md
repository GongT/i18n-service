# i18n
** please edit this file **

# how to build
## requirements
* `bash --version` >= 4
* commands `node`(not `nodejs`), `npm`, `git`, `docker` are available in your `$PATH`   
* service `docker-engine` is running
* npm package `@gongt/jenv`, `@gongt/micro-build` are installed globally    
    (install with: `sudo npm install --global @gongt/jenv @gongt/micro-build`)
* extra :
	* ubuntu: `apt-get install realpath debianutils which`.
	* (optional) folder `/data/service` is writable   

#### document about `jenv` (@gongt/jenv)
https://github.com/GongT/jenv.git

#### document about `microbuild` (@gongt/micro-build)
https://github.com/GongT/micro-build.git

### deploy this service on server
*also fine using locally*

```bash
microbuild deploy https://example.com/user/this-project-url.git
```

You are required to answer many questions during deploy.
If you want to run this in background, you must init `jenv` first.

### upgrade online instance on server

this command will:
1. drop any local changes
1. git pull
1. run build process

**<span style="color:red;font-weight:bold">never run this during development !!!</span>**


```bash
cd /data/service/this-project-name
microbuild upgrade
```

### service control (on deploy server)
most linux system:
* control     : `systemctl start|stop|restart this-project-name`
* view log    : `journalctl -S "2017-1-19 08:00" -u this-project-name`
* monitor log : `journalctl -fu this-project-name`

some old ubuntu: (without systemd)
* control     : `systemctl start|stop|restart this-project-name`
* view log    : not support
* monitor log : not support

compatible: (must run in project folder)
* control     : `systemctl start|stop|restart this-project-name`
* view log    : not support
* monitor log : not support


### debug run in host machine

```bash
git clone https://example.com/user/this-project-url.git
npm install
jspm install     # if you use jspm
micro-build debug
```

### debug run in docker

local testing, bug the result will same as server! (though config file is different)

```bash
micro-build build
micro-build foreground
```