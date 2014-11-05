#!/bin/env node
var express  = require( 'express' );
var http     = require( 'http' );
var jade     = require( 'jade' );
var chat     = require( './libs/ChatRoomLib' );

var MathChatApp = function() {

    var chatRoomList = new chat.ChatRoomList();
    var chatRoomRegex = new RegExp( '\/chat-room\/([a-zA-Z0-9-_]+)' );

    var app;
    var server;
    var io;

    function initalizeServer() {
        app = express();
        app.set( 'views', './views' );
        app.set( 'view engine', 'jade' );
        app.engine( 'jade', jade.__express );
        app.use( '/css/', express.static( __dirname + '/views/css' ) );
        app.use( '/images/', express.static( __dirname + '/views/images' ) );
        app.use( '/js/', express.static( __dirname + '/views/js' ) );
        app.use( '/polymer/', express.static( __dirname + '/views/polymer' ) );
        app.use( '/components/', express.static( __dirname + '/views/components' ) );

        server = http.Server( app );

        var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
        var ip   = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

        server.listen( port, ip, function() {
            console.log( 'Listening on ' + ip + ':' + port );
        } );

        io = require( 'socket.io' )( server );
    }

    function initalizeSocketStuff() {
        io.on( 'connection', function( socket ) {

            var chatRoomNames = [];
            for( var i = 0; i < chatRoomList.length(); i++ ) {
                var chatRoom = chatRoomList.getChatRoomAt( i );
                if( !chatRoom.isPrivate() ) {
                    chatRoomNames.push( chatRoom.getName() );
                }
            }

            socket.emit( 'existing-rooms', chatRoomNames );

            socket.on( 'new-participant', function( userInfo ) {
                var alias       = null;
                var room        = null;
                var participant = null;

                if( userInfo.room.isDirectLink ) {
                    alias = userInfo.alias;
                    room  = chatRoomList.getChatRoomByUrlName( userInfo.room.roomName );
                    if( room === null ) {
                        socket.emit( 'null-room', {
                            error: 'Null Room',
                            message: 'Room doesn\'t exist'
                        } );
                    } else {
                        participant = new chat.ChatParticipant( userInfo.alias, socket );
                        try {
                            room.addParticipant( participant );
                        } catch( e ) {
                            socket.emit( 'user-already-exists', e );
                            return;
                        }
                        socket.emit( 'added', {
                            alias: alias,
                            isDirectLink: true,
                            roomName: room.getName(),
                            roomUrlName: '',
                            participants: room.getParticipantsAliases()
                        } );
                    }
                } else {
                    alias = userInfo.alias;
                    room  = chatRoomList.getChatRoom( userInfo.room.roomName );
                    if( room === null ) {
                        room = new chat.ChatRoom( userInfo.room.roomName, { isPrivate: userInfo.room.isPrivate } );
                        console.log( alias + ' created a new room ' + room.getName() );
                        try {
                            chatRoomList.addChatRoom( room );
                        } catch( e ) {
                            socket.emit( 'room-already-exists', e );
                            return;
                        }
                    }
                    participant = new chat.ChatParticipant( userInfo.alias, socket );
                    try {
                        room.addParticipant( participant );
                    } catch( e ) {
                        socket.emit( 'user-already-exists', e );
                        return;
                    }
                    socket.emit( 'added', {
                        alias: alias,
                        isDirectLink: false,
                        roomName: room.getName(),
                        roomUrlName: room.getUrlName(),
                        participants: room.getParticipantsAliases()
                    } );
                }

                if( room === null ) return;

                room.on( 'user-connected', function( userAlias, chatRoom ) {
                    console.log( userAlias + ' entered room ' + chatRoom.getName() );
                    socket.emit( 'user-connected', userAlias );
                } )

                room.on( 'user-disconnected', function( userAlias, chatRoom ) {
                    console.log( userAlias + ' left room ' + chatRoom.getName() );
                    if( chatRoom.length() === 0 ) {
                        chatRoomList.removeChatRoom( chatRoom );
                    }
                    socket.emit( 'user-disconnected', userAlias );
                } );

                socket.on( 'new-message', function( messageInfo ) {
                    room.broadcastMessage( messageInfo.message, messageInfo.alias );
                } );

            } );

        } );
    }

    this.start = function() {
        initalizeServer();
        initalizeSocketStuff();

        app.use( function( req, res, next ) {
            var match = chatRoomRegex.exec( req.url );

            if( req.url === '/' ) {
                res.render( 'index', {
                    title: 'MathChat',
                    linked: false
                } );
            } else if( match ) {
                var chatRoom = chatRoomList.getChatRoomByUrlName( match[ 1 ] );
                if( chatRoom === null ) {
                    res.render( '404' );
                    return;
                }

                res.render( 'index', {
                    title: 'MathChat',
                    linked: true,
                    message: 'Connect to ' + chatRoom.getName()
                } );
            } else {
                res.render( '404' );
            }
            next();
        } );

    }

}

var app = new MathChatApp();
app.start();