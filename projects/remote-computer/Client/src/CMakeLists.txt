file( GLOB client_SRC
      .
      *.hpp
      *.cpp
)

foreach( file ${client_SRC})
    message( "File = " ${file} )
endforeach()
set( client_SRC ${client_SRC}
     CACHE internal "The client src files"
)