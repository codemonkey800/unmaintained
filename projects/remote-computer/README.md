RemoteComputer
=============
A Server/Client application that allows the server to send commands over to remote computer clients. This program is intended for malicious usee ;)

The application was initially developed to prank my dormmate. I decided to push the project online in case anyone else wanted to try it out. 

Requirements
============
- The server computer needs NodeJS
- The client computer needs to be running Windows
- Compilation for the client requires CMake and Boost
- For Boost, you need to compile several components to use Boost.Asio:
    - System
    - Date_Time
    - Regex

Building
========
The server app is simple to use. Just run 
```
    npm install
```

in the server directory and it should install the required modules. Then run
```
    node server
```
to run the server.

For the client, do:
```
    cd Client
    mkdir build
    cd build
    cmake ..
```

You will most likely need to set cache variables to compile the required libs for Boost. Run cmake again using:
```
    cmake -DBOOST_ROOT=<Boost Location> -BOOST_LIBRARYDIR=<Libs Location> ..
```
I used static lirbaries in the ```CMakeLists.txt``` file, so if you wish to use shared libraries, just change
```
    set( Boost_USE_STATIC_LIBS ON )
```
to off, or comment out the line.

Excelsior
=======
![](http://goo.gl/S6qY2O)