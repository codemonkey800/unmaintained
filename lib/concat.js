var fs = require( 'fs' );

module.exports = function( files ) {
    var buffer = '';
    for( var i = 0; i < files.length; i++ ) {
        buffer += fs.readFileSync( files[ i ] ).toString() + '\n';
    }
    return buffer;
}