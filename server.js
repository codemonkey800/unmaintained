#!/bin/env node
var express  = require( 'express' );
var http     = require( 'http' );

String.prototype.replaceAll = function( find, replace ) {
    return this.replace( new RegExp( find, 'g' ), replace );
}

var ChatParticipant = function( alias, socket ) {

    this.alias  = alias;
    this.socket = socket;

}

var ChatRoom = function( name, options ) {

    // Ew
    var urlName         = name.replaceAll( '-', '' ).replaceAll( ' ', '-' ).replaceAll( '--', '-' ).toLowerCase();
    var participants    = [];
    if( options === undefined ) options = {};
    var roomName        = options.roomName || 'HerpDerp';
    var maxParticipants = options.maxParticipants || -1;
    var privateRoom     = options.privateRoom || false;

    this.addParticipant = function( participant ) {
        participants.push( participant );
    }

    this.removeParticipant = function( participant ) {
        for( var i = 0; i < participants.length; i++ ) {
            if( participants[ i ].alias === participant.alias ) {
                participants.splice( i, 1 );
            }
        }
    }

    this.removeParticipantIndex = function( index ) {
        participants.splice( index, 1 );
    }

    this.broadCastMessage = function( msg ) {

    }

    this.setName = function( newName ) {

    }

    this.getName = function() {
        return name;
    }

    this.getUrlName = function() {
        return urlName;
    }

}

var MathChatApp = function() {

    var chatRooms = [];
    var chatRoomRegex = new RegExp( '\/chat-room\/([a-zA-Z0-9-_]+)' );

    var app;
    var server;
    var io;

    function initalizeServer() {
        app = express();
        app.set( 'views', './views' );
        app.set( 'view engine', 'jade' );
        app.engine( 'jade', require( 'jade' ).__express );
        app.use( '/css/', express.static( __dirname + '/views/css' ) );
        app.use( '/images/', express.static( __dirname + '/views/images' ) );
        app.use( '/js/', express.static( __dirname + '/views/js' ) );
        app.use( '/polymer/', express.static( __dirname + '/views/polymer' ) );
        app.use( '/components/', express.static( __dirname + '/views/components' ) );

        server = http.Server( app );
        server.listen( process.env.OPENSHIFT_NODEJS_PORT || 8080 );

        io = require( 'socket.io' )( server );
    }

    function serializeObject( object ) {
        return JSON.stringify( object );
    }

    function initalizeSocketStuff() {
        io.on( 'connection', function( socket ) {
            var chatRoomNames = [];
            for( var i = 0; i < chatRooms.length; i++ ) {
                chatRoomNames.push( chatRooms[ i ].getName() );
            }
            socket.emit( 'existing-rooms', chatRoomNames );
        } );
    }

    function getChatRoom( urlName ) {
        for( var i = 0; i < chatRooms.length; i++ ) {
            if( chatRooms[ i ].getUrlName() === urlName ) {
                return chatRooms[ i ];
            }
        }
        return null;
    }

    this.start = function() {
        initalizeServer();
        initalizeSocketStuff();

        chatRooms.push( new ChatRoom( 'Mathematics' ) );
        chatRooms.push( new ChatRoom( 'Calculus II' ) );
        chatRooms.push( new ChatRoom( 'HerpDerp - Global Room' ) );

        app.use( function( req, res, next ) {
            var match = chatRoomRegex.exec( req.url );

            if( req.url === '/' ) {
                res.render( 'index', {
                    title: 'MathChat',
                    linked: false
                } );
            } else if( match ) {
                var chatRoom = getChatRoom( match[ 1 ] );
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