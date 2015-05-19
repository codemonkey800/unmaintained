#include "client.hpp"

#define HOST "localhost"
#define PORT "6969"

using boost::asio::ip::tcp;

int main() {

    boost::asio::io_service io_service;
    tcp::resolver resolver{ io_service };
    auto endpoint_iter = resolver.resolve( { HOST, PORT } );

    client c{ io_service, endpoint_iter };

    io_service.run();
}