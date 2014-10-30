Jerms' Blog
====
The source code for Jeremy's awesome blog!

# License
---

The source code uses the MIT license because MIT is cool.

# The Source
----

The website is statically generated using [HarpJS](http://harpjs.com/). All of the pages are written with the 
[Jade templating language](http://jade-lang.com/). Moreover, the server is run and compiled using a custom script
through [NodeJS](http://nodejs.org/). 

The preview server and compilation must be run through the custom scripts because of the custom hashtag filtering
support.

# Running the server
----

To run the server and the plugins I wrote for the server, you'll need Harp and fs.extra.

```
	npm install harp fs.extra
```

After doing that, you can run the server using

```
    node server.js --port 80
```

The server should dynamically regenerate the site when changes are made. Also, the server should also generate
new pages for hashtag searches, or add new posts to existing hashtag pages. The filtered pages 
are generated in the filter folder and can be accessed using a URL in the format

```
    <Base>/filter/<Hashtag>
```

To build the website, run

```
    node server.js build
```

# Creating new posts
----

Creating posts is a tedious and repetitive process, involving dating and naming folders appropriately, adding
the appropriate metadata to the _data.json file. Instead, I wrote a simple script that allows the addition
and removal of new posts. Namely, post.js

To create a new post, simply run

```
    node post.js <Title> <Description> <Tags> <Banner>
```

Title is pretty self-explanatory. It's the title of your post.

Description, also self-explanatory.

Tags are simply hashtags that will be used by your post. They're made into links on each
post and simply filter out posts with the same hashtag. To define hashtags for a particular
post, simply use a string in the form

```
	"#c++ #programming #mathematics"
```

Banner refers to a banner image to use for the post. Make sure you define one, otherwise your 
default banner will be this:

![There was an image here. It's no longer here.]( http://goo.gl/fSV1oN )

The script will create a new folder with a [title].jade file and add  the new post at the top of the JSON data.

# About the server.js and post.js scripts
---

The server.js and post.js scripts uses NodeJS to function properly. Moreover, the two scripts use
synchronous calls rather than asynchronous calls to simplify its development. Also, the two are meant to 
be run in the command line anyway, so it's okay.

# Excelsior
---

![There was an image here. It's no longer here.](http://goo.gl/Tu3BUa)
