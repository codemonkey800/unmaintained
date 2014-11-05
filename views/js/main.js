function initalizeChatInterface( roomInfo ) {

    var chatInterface = new ChatInterface();
    chatInterface.alias = roomInfo.alias;

    Util.injectHTMLContent( chatInterface );
    Util.fadeInContent();    

    chatInterface.$.participantsListing.setParticipants( roomInfo.participants );

    socket.on( 'user-connected', function( alias ) {
        chatInterface.$.participantsListing.addParticipant( alias );
    } );
    socket.on( 'user-disconnected', function( alias ) {
        chatInterface.$.participantsListing.removeParticipant( alias );
    } );

    chatInterface.addEventListener( 'new-message', function( e ) {
        socket.emit( 'new-message', e.detail );
    } );

    socket.on( 'new-message', function( message, alias ) {
        chatInterface.$.messageListing.appendMessage( message, alias );
    } );

}