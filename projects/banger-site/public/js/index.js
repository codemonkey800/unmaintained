$( window ).on( 'load', function() {
    if( location.pathname !== '/' && location.pathname !== '/index' ) {
        return;
    }

    $( '.navbar-default' ).css( 'opacity', 0 );
    $( '.navbar-default' ).css( 'transform', 'translateY(-100%)' );

    $( '.home-link' ).click( function( e ) {
        e.preventDefault();
        $.fn.fullpage.moveSectionUp();
    } );
    $( '.sign-up-link' ).click( function( e ) {
        e.preventDefault();
        $.fn.fullpage.moveSectionDown();
    } );


    // Give the nav bar time to hide
    setTimeout( function() {
        $( '.navbar-default' ).css( 'opacity', 1 );
    }, 400 );

    $( document ).on( 'submit', '.form-inline', function( e ) {
        e.preventDefault();

        var fullName = $( '#input-full-name' ).val();
        var email = $( '#input-email' ).val();

        if( !fullName.length || !email ) return;

        $.ajax( '/beta-sign-up', {
            contentType: 'application/json',
            data: JSON.stringify( {
                fullName: fullName,
                email: email
            } ),
            method: 'POST',

            beforeSend: function() {
                // Change success alert to loading alert
                $successAlert = $( '#fullpage .section .two .alert' );
                $successAlert.html( '<strong>Sending</strong> Please wait, some intelligent hamsters are doing work.' );
                $successAlert.removeClass( 'alert-success' );
                $successAlert.removeClass( 'alert-hidden' );
                $successAlert.addClass( 'alert-info' );

                setTimeout( function() {
                    $successAlert.addClass( 'alert-success' );
                    $successAlert.addClass( 'alert-hidden' );
                    $successAlert.removeClass( 'alert-info' );
                }, 1500 );
            },

            complete: function() {
                $successAlert = $( '#fullpage .section .two .alert' );
                $successAlert.html( '<strong>Success</strong> Welcome to Banger!' );
                $successAlert.removeClass( 'alert-hidden' );

                setTimeout( function() {
                    $successAlert.addClass( 'alert-hidden' );
                }, 2500 );
            }
        } );
    } );

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
         // Enable when site has content
         //
         // afterLoad: function( anchorLink, index ) {
         //    if( index == 2 ) {
         //        Banger.navbar.show();
         //    }
         // },
         // onLeave: function( index ) {
         //    if( index == 2 ) {
         //        Banger.navbar.hide();
         //    }
         // }
    } );
} );
