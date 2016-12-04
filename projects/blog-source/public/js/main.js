$( function() {

    function getFontSize( textElement ) {
        return parseFloat( window.getComputedStyle( textElement, null ).getPropertyValue( 'font-size' ) );
    }

    // Make the titles for the lists in the footers look nice on mobile

    var footerListTitles = $( '.footer-list-title' );

    if( $( window ).width() <= 400 ) {
        footerListTitles.removeClass( 'footer-list-title' );
        footerListTitles.addClass( 'text-center' );
    } else {
        footerListTitles.removeClass( 'footer-list-title' );
    }

    // Reduce the width of all equations until they fit the screen

    var equations = $( '.equation' );
    if( equations.length === 0 ) {

    } else {
        // Wait until MathJax finishes rendering equations
        MathJax.Hub.Queue( [ 'Typeset', MathJax.Hub, function() {
            for( var i = 0; i < equations.length; i++ ) {
                while( equations[ i ].scrollWidth > window.innerWidth ) {
                    equations[ i ].style.fontSize = ( getFontSize( equations[ i ] ) - 5 ) + 'px';
                }
            }
        } ] );
    }


} );