code-sucks
=========
My awesome blog about code, computer science, maths, and othr cool stuff.

This be the source code of said blog. It uses a lot of gulp-plugins, including my own plugin, [gulp-site-config](https://www.npmjs.com/package/gulp-site-config). 

Getting Set Up
=============
If you're inspired to make a blog like mine, feel free to clone the repo! Just make sure you delete the important stuff please. :)

For instance, please overwrite the `_include/comments.jade` and `_include/analytics.jade`. Oh and overwrite the `package.json` file too with your own site name or something.

After cloning, simply run
```
    npm install
```

You also need Gulp installed globally, so run
```
    sudo npm install -g gulp
```

You don't need `sudo` if you run on Windows. 

You can compile the site using `gulp` and run the [Express](http://expressjs.com/) server using `gulp server`. After you're set up, hack away!

