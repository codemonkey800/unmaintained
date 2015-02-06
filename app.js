var args   = require( 'yargs' ).argv,
    Server = require( './lib/server' ),
    config = require( './config' );

function main( args ) {
    var s = new Server( config.server.port, config.server.debug );
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