var express   = require( 'express' ),
    jade      = require( 'jade' ),
    glob      = require( 'glob' ),
    concat    = require( './concat' ),
    UglifyJS  = require( 'uglify-js' ),
    UglifyCSS = require( 'uglifycss' );

module.exports = Server;

function Server( port, debug ) {
    var self = this;

    if( typeof port === 'boolean' ) {
        self.port = 8080;
        self.debug = port;
    } else {
        self.port  = port || 8080;
        self.debug = debug || false;
    }

    self.app = express();

    self.app.set( 'view engine', 'jade' );

    self.app.get( '/', function( req, res ) {
        res.render( '../public/index.jade' );
    } );

    // Site JS file
    self.app.get( '/site.min.js', function( req, res ) {
        glob( 'public/js/*', function( err, files ) {
            if( !err ) {
                var code;
                if( self.debug ) {
                    code = concat( files );
                } else {
                    code = UglifyJS.minify( files , {
                        mangle: true
                    } ).code;
                }

                res.set( 'Content-Type', 'text/javascript' );
                res.send( code );

            } else {
                res.status( 500 );
            }
        } );
    } );
    // Site CSS file
    self.app.get( '/site.min.css', function( req, res ) {
        glob( 'public/css/**/*.css', function( err, files ) {
            if( !err ) {
                var code;
                if( self.debug ) {
                    code = concat( files );
                } else {
                    code = UglifyCSS.processFiles( files );
                }

                res.set( 'Content-Type', 'text/css' );
                res.send( code );
            } else {
                res.status( 500 );
            }
        } );
    } );

    // Static assets
    self.app.use( '/assets', express.static( 'public/assets' ) );

    // Last middleware; 404 page
    self.app.use( function( req, res ) {
        res.render( '../public/404.jade' );
    } );
}

Server.prototype = {
    /**
     * Starts the server
     * @param  {Function} cb A callback to be called once the server has started
     */
    start: function( cb ) {
        var server = this.app.listen( this.port, function() {
            cb( {
                address: server.address().address,
                port: server.address().port
            } );
        } );
    }
};
