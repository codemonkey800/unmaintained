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

Adding New Posts
===============
Posts are easily manager using `post-manager.js`, a simple script I wrote to manage posts! You can add, remove, update, and list posts.

##add
Adding posts takes the following args:
- `--title` The title of the post
- `--tags` Relevant hashtags for the post
- `--summary` A summary of the post
- `--banner` A picture used to represent the post

##remove
I made the restriction that posts can only have titles of the same name in different years. So, for remove
you only have two args: `--title` and `--year`.

##update
Used to update the date of a page or post. Use `--page` to update a page specified in the `src/_data.json` file. Use `--title` and `--year` to update a regular post. Pages will have their dates simply changed while update posts will append an *edited* date.

##list
Lists all posts created. Use `--year` and `--month` to filter posts. You can use either or both at the same time.
