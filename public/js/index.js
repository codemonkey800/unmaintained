$( window ).on( 'load', function() {
    if( location.pathname !== '/' && location.pathname !== '/' ) {
        return;
    }

    $( '.navbar-default' ).css( 'opacity', 0 );
    $( '.navbar-default' ).css( 'transform', 'translateY(-100%)' );

    // Give the nav bar time to hide
    setTimeout( function() {
        $( '.navbar-default' ).css( 'opacity', 1 );
    }, 400 );

} );

Banger.navbar = {
    show: function() {
        $( '.navbar-default' ).css( 'transform', 'translateY(0)' );
    },

    hide: function() {
        $( '.navbar-default' ).css( 'transform', 'translateY(-100%)' );
    }
};
