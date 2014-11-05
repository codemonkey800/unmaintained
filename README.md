MathChat
-------

An awesome web app that allows people to talk in mathematics to each other. Inspired by the project, [MathIm](http://mathim.com/),
MathChat aims to be another mathematics chatting web app while looking nice at the same time.

The app is hosted on [Openshift](https://www.openshift.com/) and can be used here: 
[http://mathchat-jermsapp.rhcloud.com/](http://mathchat-jermsapp.rhcloud.com/).

State
-----

The app is currently in an Alpha state. There are a lot of bugs, especially in the UI. There are also a lot of
features that I want to add, such as being in multiple chat rooms in one page or adding more
Material Design-ish transitions. The app definitely works, but there is more work to be done.

Libraries
---------
MathChat runs on Node.js, and its backend is written in JavaScript and its frontend written in Jade. The website uses 
[Polymer](https://www.polymer-project.org/), and the custom components are written in standard HTML/CSS/JS.

Getting set up
-------------
First, clone the repository:

```
    git clone https://github.com/codemonkey800/MathChat.git
```

MathChat requires Jade, Express, and Socket.io, so make sure you run

```
    npm insatll
```

to install MathChat's dependencies.

Finally, simply run

```
    node server
```

to run the server, and to connect, enter

```
    localhost:8080
```

into your browser. For Polymer to work properly, it's recommended you use Chrome.

Contributing
------------
If you find my code garbage or if you want to add a feature, then feel free to contribute.

Excelcior
--------
![There was an image here. It is no longer here](http://goo.gl/Tu3BUa)
