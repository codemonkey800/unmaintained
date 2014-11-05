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
        var isPrivate    = false;
        var isDirectLink = false;

        if( loginCard.$.aliasText.value )  {
            alias = loginCard.$.aliasText.value;
        } else {
            Util.errorToast( 'You need an alias to chat' );
            return;
        }

        if( loginCard.isLinked ) {
            var match = /\/chat-room\/([a-zA-Z0-9-_]+)/.exec( window.location.href );
            room = match[ 1 ];
            isDirectLink = true;
        } else if( loginCard.$.roomDropdown.selectedItem ) {
            room = loginCard.$.roomDropdown.selectedItem.label;
        } else if( loginCard.$.customRoomText.value ) {
            room = loginCard.$.customRoomText.value;
        } else {
            Util.errorToast( 'You need to select or create a room' );
            return;
        }

        isPrivate = loginCard.$.privateRoomSelector.selected == 'yes';

        socket.emit( 'new-participant', {
            alias: alias,
            room: {
                isPrivate: isPrivate,
                isDirectLink: isDirectLink,
                roomName: room
            }
        } );

    }

};

socket.on( 'existing-rooms', function( rooms ) {
    loginCard.setRooms( rooms );
} );

socket.on( 'null-room', function( e ) {
    Util.errorToast( 'Could not get room' )
    console.log( e );
} );

socket.on( 'room-already-exists', function( e ) {
    Util.errorToast( 'The room already exists' );
    console.log( e );
} )

socket.on( 'user-already-exists', function( e ) {
    Util.errorToast( 'User with that alias already exists' );
    console.log( e );
} );

socket.on( 'added', function( roomInfo ) {
    if( !roomInfo.isDirectLink ) {
        window.history.pushState( {}, '', 'chat-room/' + roomInfo.roomUrlName );
    }

    var content = document.querySelector( '#content' );
    var loginCardDiv = document.querySelector( '#loginCard' );

    var anim = Util.fadeOutContent();

    anim.addEventListener( 'core-animation-finish', function() {
        content.removeChild( loginCardDiv );
        initalizeChatInterface( roomInfo );
    } );
} );

