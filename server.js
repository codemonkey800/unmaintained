var harp                = require( 'harp' );
var fs                  = require( 'fs' );
var path                = require( 'path' );
var postFilter          = require( './plugins/PostFilter' );
var PaginationGenerator = require( './plugins/PaginationGenerator' ).PaginationGenerator;

var generator;

function getGlobalData() {
    return JSON.parse( fs.readFileSync( 'harp.json' ).toString() ).globals;
}

function getPostsData() {
    return JSON.parse( fs.readFileSync( 'public/posts/_data.json' ).toString() );
}

function startHarpServer( port ) {
    console.log( 'Port started on port ' + port );
    harp.server( '.', { port: port } );

    postFilter.createFilterPages();
    generator.generate();

    fs.watchFile( 'public/posts/_data.json', function() {
        var result = postFilter.createFilterPages();
        console.log( 'Filter Pages Enabled:' );
        console.log( result.pagesCreated );
        console.log( 'Filter Pages Removed:' );
        console.log( result.pagesRemoved );
    } );
    fs.watchFile( 'public/_layouts/filter-page.jade', function() {
        console.log( 'Layout for filter page changed...' );
        var result = postFilter.createFilterPages();
        console.log( 'Filter pages regenerated' ) ;
    } );
    fs.watchFile( 'public/_layouts/paginated-page.jade', function() {
        console.log( 'Layout for paginated pages changed...' );
        postFilter.createFilterPages();
        generator.generate();
        console.log( 'Paginated pages changed' );
    } );
    fs.watchFile( 'harp.json', function() {
        console.log( 'Globals changed...' );
        postFilter.createFilterPages();
        var options = generator.getOptions();
        options.postsPerPage = getGlobalData().postsPerPage;
        generator.setOptions( options );
        generator.generate();
        console.log( 'Finished making changes' );
    } );
}

function compileSite() {
    postFilter.createFilterPages(); 
    generator.generate();
    harp.compile( '.', '.' );
}

function main( args ) {
    var options = {
        postsPerPage: getGlobalData().postsPerPage,
        postsData: getPostsData(),
        firstPage: {
            dir: '/',
            fileName: 'index.jade',
            title: 'Home',
            layoutPath: ''
        },
        page: {
            dir: '/page/',
            title: 'Home - Page ',
            layoutPath: '../'
        }
    };
    generator = new PaginationGenerator( options );

    if( args.length === 2 ) {
        startHarpServer( 80 );
    } else if( args.length > 2 ) {
        if( args[ 2 ] === '--port' ) {
            if( args[ 3 ] !== undefined ) {
                startHarpServer( parseInt( args[ 3 ] ) );
            } else {
                console.log( 'Port not specified' );
            }
        } else if( args[ 2 ] === 'build' ) {
            compileSite();
        } else {
            console.log( 'Invalid command' );
        }
    }
}

main( process.argv );