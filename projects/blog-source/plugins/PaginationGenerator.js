var fs        = require( 'fs.extra' ); 
var path      = require( 'path' );
var util      = require( 'util' );
var Paginator = require( './Paginator' ).Paginator;

/**
*  I'm so so so sorry for the ugly code. I'll improve the PaginationGenerator class in the future,
*  but for now, this is what we're working with
*/

exports.PaginationGenerator = function( options ) {

	if( options === undefined || options === null ) {
		throw {
			error: 'undefined or null options',
			message: 'options must be defined'
		};
	}

	var postsPerPage = options.postsPerPage;
	var postsData    = options.postsData;
	var paginator    = new Paginator( postsPerPage, postsData );

	function getPostListingPageTemplate() {
		return fs.readFileSync( 'public/_layouts/paginated-page.jade' ).toString();
	}

	function getPostsData() {
		return JSON.parse( fs.readFileSync( 'public/posts/_data.json' ).toString() );
	}

	this.setOptions = function( newOptions ) {
		options = newOptions;
		postsPerPage = options.postsPerPage;
		postsData    = options.postsData;
		paginator    = new Paginator( postsPerPage, postsData );
	}

	this.getOptions = function() {
		return options;
	}

	this.generate = function() {
		var numPages = paginator.getPaginationLength();
		var template = getPostListingPageTemplate();

		var pageIndex = 0, postIndex = 0;
		for( ; pageIndex < numPages && postIndex < postsData.length; pageIndex++ ) {
			var pageFileName, pageTitle, layoutPath;
			if( pageIndex === 0 ) {
				pageFileName = options.firstPage.dir + options.firstPage.fileName;
				pageTitle    = options.firstPage.title;
				layoutPath   = options.firstPage.layoutPath;
			} else {
				pageFileName = options.page.dir + ( pageIndex + 1 ) + '.jade';
				pageTitle    = options.page.title +  ( pageIndex + 1 );
				layoutPath   = options.page.layoutPath;
			}

			var postEndIndex = postIndex + postsPerPage;
			if( postEndIndex > postsData.length ) {
				postEndIndex = postsData.length;
			}

			fs.writeFileSync( 'public/' + pageFileName,
			                  util.format( template,                // Template file used for paginated
			                  		       layoutPath,              // Really hackish fix for layout path
			                               pageTitle,               // Title of paginated page
			                               postsData,               // The data of all posts ( TODO Optimize )
			                               postIndex, postEndIndex, // Subset of posts to list
			                               numPages,                // Determins if pagination should be used
			                               numPages,                // Length of pagination,
			                               options.firstPage.dir 
			                               + path.basename( options.firstPage.fileName, '.jade' ),
			                               options.page.dir,
			                               pageIndex                // Index of page to display active pagination
			                              ) );

			postIndex += postsPerPage;

		}

		var pages = fs.readdirSync( 'public/' + options.page.dir );
		for( var i = 0; i < pages.length; i++ ) {
			if( parseInt( pages[ i ].slice( 0, 1 ) ) > numPages ) {
				fs.unlink( 'public/' + options.page.dir + pages[ i ] );
			}
		}
	};  

};