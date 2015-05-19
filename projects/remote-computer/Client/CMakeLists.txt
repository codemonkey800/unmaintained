cmake_minimum_required( VERSION 3.0 )
project( client )

# Configuration

set( Boost_USE_STATIC_LIBS ON )

find_package( Boost
              1.57.0
              REQUIRED
              COMPONENTS system date_time regex
)

set( CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/bin
     CACHE PATH "The output of the Client and Server binaries"
)

include_directories( 
    ${Boost_INCLUDE_DIRS}
)

if( UNIX )
    set( CMAKE_CXX_FLAGS "-std=c++11" )
endif()

# End configuration 

add_subdirectory( src src )
add_executable( Client ${client_SRC} )
target_link_libraries( Client ${Boost_LIBRARIES} )