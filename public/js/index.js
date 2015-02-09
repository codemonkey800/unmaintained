$( window ).on( 'load', function() {
    if( location.pathname !== '/' && location.pathname !== '/index' ) {
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

$( document ).ready( function() {
    $( '#fullpage' ).fullpage( {
         afterLoad: function( anchorLink, index ) {
            if( index == 2 ) {
                Banger.navbar.show();
            }
         },
         onLeave: function( index ) {
            if( index == 2 ) {
                Banger.navbar.hide();
            }
         }
    } );
} );
