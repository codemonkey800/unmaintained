var fs   = require( 'fs.extra' );
var path = require( 'path' );
var util = require( 'util' );

var today = new Date();
var todayString = ( today.getMonth() + 1 ) + '-' + today.getDate() + '-' + today.getFullYear();

function getPostPageTemplate() {
    return fs.readFileSync( 'public/_layouts/post-page.jade' ).toString();
}


function HashTags( tags ) {
    if( tags instanceof Array ) {
        this.tags = tags;
    } else if( typeof tags === 'string' ) {
        this.tags = tags.split( ' ' );
    } else {
        throw {
          error: 'Invalid Tags Object',
          message: tags + ' is not a valid tabs object. Use a String or Array'
        };
    }

    this.constructHashTags = function() {
        var hashtags = {};
        for( var i = 0; i < this.tags.length; i++ ) {
            hashtags[ this.tags[ i ] ] = '/filter/' + this.tags[ i ].slice( 1, this.tags[ i ].length ) + '/1';	
        }
        return hashtags;
    };

    this.toHtmlString = function() {
        var htmlStr = '';
        var hashtags = this.constructHashTags();
        for( var hashtag in hashtags ) {
            htmlStr += util.format( '            a.hashtag( href="%s" ) %s \n',
                                    '/filter/' + hashtag.slice( 1, hashtag.length ),
                                    hashtag );
        }
        return htmlStr;
    };
}

function getPostData() {
	return JSON.parse( fs.readFileSync( 'public/posts/_data.json' ).toString() );
}

function writePostData( postData ) {
	fs.writeFileSync( 'public/posts/_data.json', JSON.stringify( postData, null, 4 ) );
}

function isPostsEmpty() {
	return getPostData().length === 0;
}

function addPost( title, description, tags, banner ) {
	if( description === undefined ) {
        description = 'Le Post';
    }
	if( tags === undefined ) {
		tags = '';
	}
    if( banner === undefined ) {
        banner = 'http://goo.gl/fSV1oN';
    }

    var hashtags = new HashTags( tags );

	var postData = getPostData();
	for( var i = 0; i < postData.length; i++ ) {
		if( postData[ i ].title.toLowerCase() === title.toLowerCase() && postData[ i ].date === todayString ) {
			console.log( 'A post with title "' + title + '" and date "' + todayString + '" exists.' );
			return;
		}
	}

	var fileFriendlyTitle = title.toLowerCase().split( ' ' ).join( '-' ).replace( ':', '-' );

	var postDir = '/posts/' + todayString + '-' + fileFriendlyTitle
	try {
		fs.mkdirSync( 'public' + postDir );
		fs.writeFileSync( 'public' + postDir + '/' + fileFriendlyTitle + '.jade',
                          util.format( getPostPageTemplate(), banner, title, todayString, hashtags.toHtmlString() ) );
	} catch( e ) {
		console.log( e );
		return;
	}

	postData.unshift( {
		"date": todayString,
		"title": title,
		"desc": description,
		"tags": hashtags.constructHashTags(),
        "banner": banner,
		"url": postDir + '/' + fileFriendlyTitle
	} );
	
	writePostData( postData );
}

function removePostTitle( title ) {
	var postData = getPostData();

	for( var i = 0; i < postData.length; i++ ) {
		if( postData[ i ].title === title ) {
			fs.rmrfSync( 'public' + path.dirname( postData[ i ].url ) );
			postData.splice( i, 1 );
			writePostData( postData );
			return;
		}
	}

	console.log( 'Found no posts with the title: ' + title );
}

function listPosts() {
	var postData = getPostData();
	console.log();
	for( var i = 0; i < postData.length; i++ ) {
		console.log( 'Date: ' + postData[ i ].date );
		console.log( 'Title: ' + postData[ i ].title );
		console.log( 'Description: ' + postData[ i ].desc );
		console.log( 'Tags: ' );
        for( var hashtag in postData[ i ].tags ) {
            console.log( util.format( '  %s : %s', hashtag, postData[ i ].tags[ hashtag ] ) );
        }
        console.log( 'Banner:' + postData[ i ].banner );
		console.log( 'URL: ' + postData[ i ].url );
		console.log();
	}
}

function main( args ) {
	if( args.length == 2 ) {
		console.log( '\nDescription: A small script used to generate new posts.' )
		console.log( 'Usage: node ' + path.basename( args[ 1 ] ) + ' [add title [desc="Le Post"] [tags=""] [banner="http://goo.gl/fSV1oN"] | remove [title|date...] | list]');
		console.log( 'Example of add: node ' + path.basename( args[ 1 ] ) + ' add HerpDerp "An awesome description" "#swerg #math"' );
		console.log( 'Example of remove: node ' + path.basename( args[ 1 ] ) + ' remove HerpDerp' );
		console.log( 'Example of remove using date: node ' + path.basename( args[ 1 ] ) + ' remove 9-6-2014' );
		console.log( 'Example of multiple removes: node '+ path.basename( args[ 1 ] ) + ' remove HerpDerp Swerg' ); 
		return;
	}

	if( args[ 2 ] === 'add' ) {
		if( args[ 3 ] === undefined ) {
			console.log( 'Most specify post title' );
			return;
		}
		addPost( args[ 3 ], args[ 4 ], args[ 5 ], args[ 6 ] );
	} else if( args[ 2 ] === 'remove' ) {
		if( isPostsEmpty() ) {
			console.log( 'There are no posts' );
		} else {
			for( var i = 3; i < args.length; i++ ) {
                removePostTitle( args[ i ] );
			}
		}
	} else if( args[ 2 ] === 'list' ) {
		if( isPostsEmpty() ) {
			console.log( 'There are no posts' );
		} else {
			listPosts();
		}
	} else {
		console.log( args[ 2 ] + ' is not a valid operation.' );
	}
}

main( process.argv );