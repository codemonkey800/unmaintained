var fs   = require( 'fs.extra' );
var util = require( 'util' );
var path = require( 'path' );
var PaginationGenerator = require( './PaginationGenerator' ).PaginationGenerator;

Array.prototype.contains = function( val ) {
    return this.indexOf( val ) != -1;
};

Array.prototype.difference = function( arr ) {
    var diff = [];
    for( var i = 0; i < this.length; i++ ) {
        if( !arr.contains( this[ i ] ) ) {
            diff.push( this[ i ] );
        }
    }
    return diff;
};

exports.getFilterPageTemplate = function() {
    return fs.readFileSync( 'public/_layouts/filter-page.jade' ).toString();
}

exports.getPostData = function() {
    return JSON.parse( fs.readFileSync( 'public/posts/_data.json').toString() );
}

exports.getHashtagPages = function() {
    var pages = fs.readdirSync( 'public/filter' );
    for( var i = 0; i < pages.length; i++ ) {
        pages[ i ] = '#' + path.basename( pages[ i ], '.jade' );
    }
    return pages;
}

exports.createHashtagFilterPage = function( hashtag, filteredPostData ) {
    var template     = exports.getFilterPageTemplate();
    var postsPerPage = JSON.parse( fs.readFileSync( 'harp.json' ).toString() ).globals.postsPerPage;
    var filterDir    = '/filter/' + hashtag + '/';

    fs.mkdirpSync( 'public' + filterDir );
    var options = {
        postsPerPage: postsPerPage,
        postsData: filteredPostData,
        firstPage: {
            dir: filterDir,
            fileName: '1.jade',
            title: '#' + hashtag + ' - Page 1',
            layoutPath: '../../'
        },
        page: {
            dir: filterDir,
            title: '#' + hashtag + ' - Page ',
            layoutPath: '../../'
        }
    };

    new PaginationGenerator( options ).generate();
}

exports.removeHashtagFilterPage = function( hashtag ) {
    fs.rmrfSync( 'public/filter/' + hashtag );
}

exports.createFilterPages = function() {
    var data = exports.getPostData();
    var tags = [];
    var hashtagPages = exports.getHashtagPages();

    for( var i = 0; i < data.length; i++ ) {
        for( var tag in data[ i ].tags ) {
            if( !tags.contains( tag ) ) {
                tags.push( tag );
            }
        }
    }

    var pagesToCreate = tags;
    var pagesToRemove = hashtagPages.difference( tags );

    for( var i = 0; i < pagesToCreate.length; i++ ) {
        var filteredPostData = [];
        for( var j = 0; j < data.length; j++ ) {
            if( data[ j ].tags[ pagesToCreate[ i ] ] ) {
                filteredPostData.push( data[ j ] );
            }
        }
        exports.createHashtagFilterPage( pagesToCreate[ i ].slice( 1, pagesToCreate[ i ].length ), filteredPostData );
    }

    for( var i = 0; i < pagesToRemove.length; i++ ) {
        exports.removeHashtagFilterPage( pagesToRemove[ i ].slice( 1, pagesToRemove[ i ].length ) );
    }

    return {
      pagesCreated: pagesToCreate,
      pagesRemoved: pagesToRemove
    };

}