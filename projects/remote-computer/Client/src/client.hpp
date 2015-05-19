#pragma once
#include <string>
#include <boost/asio.hpp>

using boost::asio::ip::tcp;


class client {

public:
    client( boost::asio::io_service& io_service,
            const tcp::resolver::iterator& endpoint_iter );

    void close();

private:
    void do_connect( const tcp::resolver::iterator& endpoint_iter );
    void do_write( boost::asio::streambuf& buffer );
    void do_read();
    void parse_command( const std::string& command );

    boost::asio::io_service& _io_service;
    tcp::socket _socket;
    boost::asio::streambuf _buffer;

};