#pragma once
#include <string>
#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/json_parser.hpp>

namespace commands {
    const std::string CONSOLE_COMMAND = "ConsoleCommand";
    const std::string MESSAGE_BOX_COMMAND = "MessageBoxCommand";
};

class command {

public:
    command();

    void load( const std::string& json );
    void execute_command();

    boost::property_tree::ptree get_ptree() const;

private:
    boost::property_tree::ptree _pt;
};