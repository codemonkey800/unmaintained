var events = require( 'events' );

exports.Paginator = function( postsPerPage, postsData ) {

	var paginatedPosts;

	this.getPaginationLength = function() {
		return Math.ceil( postsData.length / postsPerPage );
	};

	this.getPosts = function( pageNumber ) {
		return paginatedPosts[ pageNumber ];
	}

	this.calculatePagination = function() {
		paginatedPosts = [];
		var pageIndex = 0, postIndex = 0, paginationLength = this.getPaginationLength();
		for( ; pageIndex < paginationLength; pageIndex++ ) {
			var page = [];
			for( var i = 0; i < postsPerPage && postIndex < postsData.length; i++, postIndex++ ) {
				page.push( postsData[ postIndex ] );
			}	
			paginatedPosts.push( page )
		}
		this.emit( 'paginationReady', paginatedPosts );
	};

	this.getPostsPerPage = function() {
		return postsPerPage;
	};

	this.getPostsData = function() {
		return postsData;
	};

	this.setPostsPerPage = function( newPostsPerPage ) {
		postsPerPage = newPostsPerPage;
		this.calculatePagination();
	};

	this.setPostsData = function( newPostsData ) {
		postsData = newPostsData;
		this.calculatePagination();
	};

};

exports.Paginator.prototype = events.EventEmitter.prototype;