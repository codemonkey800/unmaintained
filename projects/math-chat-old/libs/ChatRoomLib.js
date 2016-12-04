var EventEmitter = require( 'events' ).EventEmitter;

String.prototype.replaceAll = function( find, replace ) {
    return this.replace( new RegExp( find, 'g' ), replace );
};

exports.ChatParticipant = function( alias, socket ) {

    this.alias  = alias;
    this.socket = socket;

};

exports.ChatRoom = function( name, options ) {

    var self = this;

    // Ew
    var urlName         = name.replaceAll( '-', '' ).replaceAll( ' ', '-' ).replaceAll( '--', '-' ).toLowerCase();
    var roomName        = name;
    var participants    = [];

    if( options === undefined ) options = {};
    var isPrivate       = options.isPrivate || false;

    self.addParticipant = function( participant ) {
        if( participant instanceof exports.ChatParticipant ) {
            for( var i = 0; i < participants.length; i++ ) {
                if( participants[ i ].alias === participant.alias ) {
                    throw {
                        error: 'user-already-exists',
                        message: 'User with alias ' + participant.alias + ' already exists'
                    };
                }
            }

            for( var i = 0; i < participants.length; i++ ) {
                self.emit( 'user-connected', participant.alias, self );
            }

            participant.socket.on( 'disconnect', function() {
                self.removeParticipant( participant );
                self.emit( 'user-disconnected', participant.alias, self );
            } );
            participants.push( participant );
        }
    }

    self.removeParticipant = function( participant ) {
        if( participant instanceof exports.ChatParticipant ) {
            for( var i = 0; i < participants.length; i++ ) {
                if( participants[ i ].alias === participant.alias ) {
                    participants.splice( i, 1 );
                }
            }
        }
    }

    self.removeParticipantIndex = function( index ) {
        if( index < 0 || index > participants.length - 1 ) {
            throw {
                error: 'index-out-of-bounds',
                message: index + ' is out of bounds'
            };
        }
        participants.splice( index, 1 );
    }

    self.broadcastMessage = function( msg, alias ) {
        for( var i = 0; i < participants.length; i++ ) {
            if( participants[ i ].alias !== alias ) {
                participants[ i ].socket.emit( 'new-message', msg, alias );
            }
        }
    }

    self.getName = function() {
        return name;
    }

    self.getUrlName = function() {
        return urlName;
    }

    self.length = function() {
        return participants.length;
    }

    self.getParticipantsAliases = function() {
        var aliases = [];
        for( var i = 0; i < participants.length; i++ ) {
            aliases.push( participants[ i ].alias );
        }
        return aliases;
    }

    self.isPrivate = function() {
        return isPrivate;
    }

};

exports.ChatRoom.prototype.__proto__ = EventEmitter.prototype;

exports.ChatRoomList = function() {

    var self = this;

    var chatRooms = [];

    function roomExists( chatRoom ) {
        for( var i = 0; i < chatRooms.length; i++ ) {
            if( chatRooms[ i ].getName() === chatRoom.getName() ) {
                return true;
            }
        }
        return false;
    }

    self.addChatRoom = function( chatRoom ) {
        if( chatRoom instanceof exports.ChatRoom ) {
            if( roomExists( chatRoom ) ) {
                throw {
                    error: 'room-already-exists',
                    message: 'Room ' + chatRoom.getName() + ' already exists'
                };
            } else {
                chatRooms.push( chatRoom );
            }
        }
    }

    self.removeChatRoom = function( chatRoom ) {
        if( chatRoom instanceof exports.ChatRoom ) {
            for( var i = 0; i < chatRooms.length; i++ ) {
                if( chatRooms[ i ].getName() === chatRoom.getName() ) {
                    self.removeChatRoomAt( i );
                    return;
                }
            }
        }
    }

    self.removeChatRoomAt = function( index ) {
        if( index < 0 || index > chatRooms.length - 1 ) {
            throw {
                error: 'index-out-of-bounds',
                message: index + ' is out of bounds'
            };
        }
        chatRooms.splice( index, 1 );
    }

    self.getChatRoom = function( roomName ) {
        for( var i = 0; i < chatRooms.length; i++ ) {
            if( chatRooms[ i ].getName() === roomName ) {
                return chatRooms[ i ];
            }
        }
        return null;
    }

    self.getChatRoomByUrlName = function( urlName ) {
        for( var i = 0; i < chatRooms.length; i++ ) {
            if( chatRooms[ i ].getUrlName() === urlName ) {
                return chatRooms[ i ];
            }
        }
        return null;
    }

    self.getChatRoomAt = function( index ) {
        if( index < 0 || index > chatRooms.length - 1 ) {
            throw {
                error: 'index-out-of-bounds',
                message: index + ' is out of bounds'
            };
        }
        return chatRooms[ index ];
    }

    self.length = function() {
        return chatRooms.length;
    }

};