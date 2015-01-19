Banger Site
==========
The source code for the Banger Site yo!

Getting Set Up
==============
You need to install [Node.js](nodejs.org) to have everything working.

Once installed, run
```
    npm install
```

After, install [Gulp.js](http://gulpjs.com/):
```
    npm install -g gulp
```

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
To commit the source and compiled site in one command, run
```
    gulp commit [-h] --ssh|--https --msg <Commit Message>
```

Only use `ssh` if you have the repo ssh keys installed on your system.

Excelsior!
==========
![](http://goo.gl/S6qY2O)
