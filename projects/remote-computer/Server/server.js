var RemoteComputer = require( './js/remote-computer-server' ),
    net            = require( 'net' ),
    clear          = require( 'clear' );

// Splits a string while maintaining inner quoted strings
// Solution found at http://stackoverflow.com/questions/18703669/split-string-but-not-words-inside
function splitKeepQuoted( str ) {
    return [].concat.apply( [], str.split( '"' ).map( function( v, i ) {
        return i % 2 ? v : v.split( ' ' );
    } ) ).filter( Boolean );
}

function main( args ) {

    var server = new RemoteComputer.Server();
    var selectedClient;
    
    var options = {
        port: 6969,
        host: 'localhost'
    };
    
    server.start( options, function() {
        console.log( 'Started server on ' + options.host + ':' + options.port );
    } );

    process.stdin.on( 'data', function( data ) {
        var command = splitKeepQuoted( data.toString() );

        // Trims the last string of the \r\n chars
        var lastCommand = command[ command.length - 1 ];
        command[ command.length - 1 ] = lastCommand.substring( 0, lastCommand.length - 2 );

        if( command[ 0 ] === 'stop' ) {
            process.exit();
        } else if( command[ 0 ] == 'clear' ) {
            clear();
        } else if( command[ 0 ] == 'list' ) {
            var clients = server.getRemoteClients().toArray();
            if( clients.length == 0 ) {
                console.log( 'There are no connected clients!' );
            } else {
                console.log( 'Connected Clients' );
                console.log( '-----------------' );
                for( var i = 0; i < clients.length; i++ ) {
                    console.log( clients[ i ].computerName );
                }
            }
        } else if( command[ 0 ] == 'select' ) {
            if( command.length != 2 ) {
                console.log( 'Syntax: select <Client Computer Name>' );
                console.log( 'Hint: Use the list command to get a list of computers' );

                if( selectedClient ) {
                    console.log( '\nYour currently selected client is: ' + selectedClient.computerName );
                }

                return;
            }

            var clients = server.getRemoteClients();
            selectedClient = clients.getClient( command[ 1 ] );

            if( !selectedClient ) {
                console.log( command[ 1 ] + ' doesn\'t exist!' );
            }
        } else if( command[ 0 ] == 'sendConsoleCommand' ) {
            if( command.length < 2 ) {
                console.log( 'Syntax: sendConsoleCommand <Cmd Line>' );
                return;
            }

            if( !selectedClient ) {
                console.log( 'You need to select a client first!' );
                return;
            }

            command.splice( 0, 1 );
            server.sendConsoleCommand( selectedClient, command.join( ' ' ) );
        } else if( command[ 0 ] == 'sendMessageBox' ) {
            if( command.length < 3  ) {
                console.log( 'Syntax: sendMessageBox <Title> <Message>' )
                return;
            }

            if( !selectedClient ) {
                console.log( 'You need to select a client first!' );
                return;
            }

            command.splice( 0, 1 );
            server.sendMessageBox( selectedClient, { title: command[ 0 ], message: command[ 1 ] } );
        } else if( command[ 0 ] === 'help' ) {
            console.log( 'help: Prints out this message' );
            console.log( 'stop: Stops the server' );
            console.log( 'list: Lists all connected clients' );
            console.log( 'select: Selects a connected client' );
            console.log( 'sendConsoleCommand: Sends a console command to the client' );
            console.log( 'sendMessageBox: Displays a message box on the client' );
        } else {
            console.log( 'Unknown Command "' + command[ 0 ] + '"' );
        }
    } );

}

main( process.argv );