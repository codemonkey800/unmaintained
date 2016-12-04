var fs     = require( 'fs' ),
    format = require( 'util' ).format;

var express    = require( 'express' ),
    bodyParser = require( 'body-parser' ),
    email      = require( 'emailjs' ),
    jade       = require( 'jade' );

var gulp         = require( 'gulp' ),
    gulpif       = require( 'gulp-if' ),
    concat       = require( 'gulp-concat' ),
    sourcemaps   = require( 'gulp-sourcemaps' ),
    minifyCSS    = require( 'gulp-minify-css' ),
    uglify       = require( 'gulp-uglify' ),
    autoprefixer = require( 'gulp-autoprefixer' ),
    through      = require( 'through2' );

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

    var user = process.env.EMAIL_USER;
    var pass = process.env.EMAIL_PASS;

    if(!user) {
        throw new Error('"EMAIL_USER" is an invalid environment variable');
    }

    if(!pass) {
        throw new Error('"EMAIL_PASS" is an invalid environment variable');
    }

    self.emailServer = email.server.connect( {
        user: user,
        password: pass,
        host: 'smtp.gmail.com',
        port: 465,
        ssl: true
    } );

    var emailTemplate = fs.readFileSync( 'lib/email-template.html' ).toString();

    self.app = express();

    self.app.set( 'views', 'public' )
    self.app.set( 'view engine', 'jade' );

    self.app.get( '/', function( req, res ) {
        res.render( 'index' );
    } );

    self.app.post( '/beta-sign-up', bodyParser.json(), function( req, res ) {
        if( !req.body ) res.redirect( '/404' );

        var fullName = req.body.fullName;
        var email = req.body.email;

        var emailMessage = format( emailTemplate, fullName );

        self.emailServer.send( {
            text: emailMessage,
            from: 'Banger!',
            to: fullName + ' <' + email + '>',
            subject: 'Welcome to Banger!'
        }, function( err, message ) {
            if( err ) {
                res.status( 500 );
                res.json( {
                    statusCode: 500,
                    message: 'Internal Server Error'
                } );
            } else {
                res.json( {
                    statusCode: 200,
                    message: 'Success!'
                } );
                console.log( 'Message Successfully Sent :)');
            }
        } );
    } );

    // Site JS file
    self.app.get( '/site.min.js', function( req, res ) {
        gulp.src( 'public/js/**/*.js' )
            .pipe( sourcemaps.init() )
                .pipe( concat( 'site.min.js' ) )
                .pipe( gulpif( self.debug, uglify( { mangle: true } ) ) )
            .pipe( sourcemaps.write() )
            .pipe( through.obj( function( file, enc ) {
                res.set( 'Content-Type', 'text/javascript' );
                res.send( file.contents.toString() );
            } ) );
    } );
    // Site CSS file
    self.app.get( '/site.min.css', function( req, res ) {
        gulp.src( 'public/css/**/*.css' )
            .pipe( autoprefixer() )
            .pipe( sourcemaps.init() )
                .pipe( concat( 'site.min.css' ) )
                .pipe( gulpif( self.debug, minifyCSS() ) )
            .pipe( sourcemaps.write() )
            .pipe( through.obj( function( file, enc ) {
                res.set( 'Content-Type', 'text/css' );
                res.send( file.contents.toString() );
            } ) );
    } );

    // Static assets
    self.app.use( '/assets', express.static( 'public/assets' ) );

    // Last middleware; 404 page
    self.app.use( function( req, res ) {
        res.status( 404 );
        res.render( '404' );
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
