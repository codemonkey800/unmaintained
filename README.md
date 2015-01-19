Banger Site
==========
The source code for the Banger Site yo!

Getting Set Up
==============
## Installation
You need to install [Node.js](nodejs.org) to have everything working.

Once installed, run
```
    npm install
```

After, install [Gulp.js](http://gulpjs.com/):
```
    npm install -g gulp
```

## Debug Mode
Debug mode disables JavaScript variable mangling and pretty prints Jade output. To enable or disable
Debug mode, simply open up `config.json` and set `debug` to false or true. When comitting to both sites,
use the `commit` so that `debug` is automatically disabled in the build stage and reenabled afterwards.

Gulp Tasks
=========
To compile the site, run
```
    gulp
```
and the site will be compiled into the destination directory specified in the `config.json` file. The default is is `site`.

To clean/delete the compiled site, run
```
    gulp clean
```

To run the test server, run
```
    gulp server
```
The site will be built and an [Express](http://expressjs.com/) will be run in the root of the compiled directory.

Committing
=========
To commit the source and compiled site in one command, use
```
    gulp commit [-h] --ssh|--https --msg <Commit Message>
```

Only use `ssh` if you have the repo ssh keys installed on your system.

Here's an exmaple:
```
    gulp commit --https --msg 'Whoa a commit'
```

Debug mode is automaticall disabled when committing and then enabled after.

Excelsior!
==========
![](http://goo.gl/S6qY2O)
