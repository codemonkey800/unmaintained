var args   = require( 'yargs' ).argv,
    Server = require( './lib/server' );

function main( args ) {
    var port = process.env.PORT || 8080;
    var debug = false;

    if( args.port && typeof args.port === 'number' ) {
        port = args.port;
    }

    if( args.debug && typeof args.debug === 'boolean' ) {
        debug = args.debug;
    }

    var s = new Server( port, debug );
    s.start( function( serverDetails ) {
        console.log( 'Started server at http://localhost:%s', serverDetails.port );
        console.log( 'Type "stop" to stop the server' );

        process.stdin.resume();
        process.stdin.on( 'data', function( data ) {
            if( data.toString().indexOf( 'stop' ) !== -1 ) {
                process.exit();
            }
        } );
    } );
}

main( args );
