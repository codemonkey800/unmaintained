var Util = {

    errorToast: function( message ) {
        var toast = document.createElement( 'paper-toast' );
        toast.text = message;
        toast.style.background = '#e51c23';
        toast.style.color      = 'white';
        document.body.appendChild( toast );
        toast.show();
        setTimeout( function() {
            document.body.removeChild( toast );
        }, 4000 );
    },

    injectHTMLContent: function( node ) {
        var contentDiv = document.querySelector( '#content' );
        contentDiv.appendChild( node );
    },

    fadeOutContent: function() {
        var fadeOutAnimation = new CoreAnimation();
        fadeOutAnimation.duration = 800;
        fadeOutAnimation.keyframes = [
            { opacity: 1 },
            { opacity: 0 }
        ];
        fadeOutAnimation.fill = 'forwards';
        fadeOutAnimation.target = content;
        fadeOutAnimation.play();
        return fadeOutAnimation;
    },

    fadeInContent: function() {
        var fadeInAnimation = new CoreAnimation();
        fadeInAnimation.duration = 800;
        fadeInAnimation.keyframes = [
            { opacity: 0 },
            { opacity: 1 }
        ];
        fadeInAnimation.fill = 'forwards';
        fadeInAnimation.target = content;
        fadeInAnimation.play();
        return fadeInAnimation;
    }

};