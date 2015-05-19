<?php

    $file_path = "code\\tmp.cpp";
    $exe_path = "code\\tmp.exe";

    $code = $_POST["code"];
    
    $code_file = fopen($file_path, "w");
    
    fwrite($code_file, $code);
    
    fclose($code_file);
    
    $output = array();
    
    exec("g++4.8 -std=c++11 -static-libstdc++ " . $file_path . " -o " . $exe_path, $output, $error_code);
    
    if($error_code != 0){
        array_push($output, $error_code);
        echo json_encode($output);
    }else{
    
        unset($output);
        
        exec($exe_path, $output);
        
        echo json_encode($output);
    }
    
    if(file_exists($file_path)){
        unlink($file_path);
    }
    
    if(file_exists($exe_path)){
        unlink($exe_path);
    }
    
?>

