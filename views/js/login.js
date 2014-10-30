var socket = io();

// Initialize listeners for login-card elements
var loginCard = document.querySelector( 'login-card' );

loginCard.ready = function() {    

    loginCard.otherReady();

    loginCard.$.roomDropdown.addEventListener( 'core-select', function() {
        if( loginCard.$.customRoomText.value !== '' ) {
            loginCard.$.customRoomText.value = '';
        }
    } );
    
    loginCard.$.customRoomText.addEventListener( 'input', function() {
        if( loginCard.$.roomDropdown.selected !== null ) {
            loginCard.$.roomDropdown.selected = null;
        }
    } );
    
    loginCard.submitClick = function() {
        var alias;
        var room;   

        if( loginCard.$.aliasText.value )  {
            alias = loginCard.$.aliasText.value;
        } else {
            var errorToast = document.querySelector( '#errorToast' );
            errorToast.text = 'You need an alias to chat';
            errorToast.show();
            return;
        }

        if( loginCard.isLinked ) {
            var match = /\/chat-room\/([a-zA-Z0-9-_]+)/.exec( window.location.href );
            console.log( match );
        } else if( loginCard.$.roomDropdown.selectedItem ) {
            room = loginCard.$.roomDropdown.selectedItem.label;
        } else if( loginCard.$.customRoomText.value ) {
            room = loginCard.$.customRoomText.value;
        } else {
            var errorToast = document.querySelector( '#errorToast' );
            errorToast.text = 'You need to select or create a room';
            errorToast.show();
            return;
        }

    }

};

socket.on( 'existing-rooms', function( rooms ) {
    loginCard.setRooms( rooms );
} );