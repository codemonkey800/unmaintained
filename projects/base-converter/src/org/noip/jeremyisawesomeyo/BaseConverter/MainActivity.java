package org.noip.jeremyisawesomeyo.BaseConverter;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends Activity {
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        initButtonHandlers();
    }


    private void initButtonHandlers(){
        final Button clear    = (Button)findViewById(R.id.clear_edit_box);
        final Button decToHex = (Button)findViewById(R.id.dec_to_hex);
        final Button decToBin = (Button)findViewById(R.id.dec_to_bin);
        final Button hexToDec = (Button)findViewById(R.id.hex_to_dec);
        final Button hexToBin = (Button)findViewById(R.id.hex_to_bin);
        final Button binToDec = (Button)findViewById(R.id.bin_to_dec);
        final Button binToHex = (Button)findViewById(R.id.bin_to_hex);

        final EditText textBox = (EditText)findViewById(R.id.edit_box);

        clear.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                textBox.setText("");
            }
        });

        decToHex.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try{
                    if(textBox.getText().toString().contains("0x")){
                        textBox.setText("Value is in hexadecimal form.");
                        return;
                    }else if(textBox.getText().toString().contains("b")){
                        textBox.setText("Value is in hexadecimal form.");
                        return;
                    }

                    String text = Integer.toHexString(Integer.parseInt(textBox.getText().toString()));
                    String finalText = "";

                    for(char c : text.toCharArray()){
                        if(Character.isLetter(c) && Character.isLowerCase(c)){
                            finalText += Character.toUpperCase(c);
                        }else{
                            finalText += c;
                        }
                    }


                    textBox.setText("0x" + finalText);

                }catch(NumberFormatException e){
                    textBox.setText("Error: Value can't be parsed as int");
                }
            }
        });

        decToBin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try{
                    if(textBox.getText().toString().contains("0x")){
                        textBox.setText("Value is in hexadecimal form.");
                        return;
                    }else if(textBox.getText().toString().contains("b")){
                        textBox.setText("Value is in hexadecimal form.");
                        return;
                    }

                    textBox.setText(Integer.toBinaryString(Integer.parseInt(textBox.getText().toString())) + "b");
                }catch(NumberFormatException e){
                    textBox.setText("Error: Value can't be parsed as int");
                }
            }
        });

        hexToDec.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try{
                    String text = textBox.getText().toString();

                    if(text.contains("b")){
                        textBox.setText("Value is in binary form.");
                        return;
                    }

                    if(text.contains("0x")){
                        text = text.substring(text.indexOf('x') + 1);
                    }

                    int hex = Integer.parseInt(text, 16);

                    textBox.setText(String.valueOf(hex));

                }catch(NumberFormatException e){
                    textBox.setText("Error: Value can't be parsed as int");
                }
            }
        });

        hexToBin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try{
                    String text = textBox.getText().toString();

                    if(text.contains("b")){
                        textBox.setText("Value is in binary form.");
                        return;
                    }

                    if(text.contains("0x")){
                        text = text.substring(text.indexOf('x') + 1);
                    }

                    int hex = Integer.parseInt(text, 16);

                    textBox.setText(Integer.toBinaryString(hex) + "b");
                }catch(NumberFormatException e){
                    textBox.setText("Error: Value can't be parsed as int");
                }
            }
        });

        binToDec.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try{
                    String text = textBox.getText().toString();

                    if(text.contains("0x")){
                        textBox.setText("Value is in hexadecimal form.");
                        return;
                    }

                    if(text.contains("b")){
                        text = text.substring(0, text.indexOf('b'));
                    }

                    int bin = Integer.parseInt(text, 2);

                    textBox.setText(String.valueOf(bin));
                }catch(NumberFormatException e){
                    textBox.setText("Error: Value can't be parsed as int");
                }
            }
        });

        binToHex.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try{
                    String text = textBox.getText().toString();

                    if(text.contains("0x")){
                        textBox.setText("Value is in hexadecimal form.");
                        return;
                    }

                    if(text.contains("b")){
                        text = text.substring(0, text.indexOf('b'));
                    }

                    int bin = Integer.parseInt(text, 2);

                    text = Integer.toHexString(bin);
                    String hexText = "";

                    for(char c : text.toCharArray()){
                        if(Character.isLetter(c) && Character.isLowerCase(c)){
                            hexText += Character.toUpperCase(c);
                        }else{
                            hexText += c;
                        }
                    }

                    textBox.setText("0x" + hexText);
                }catch(NumberFormatException e){
                    textBox.setText("Error: Value can't be parsed as int");
                }
            }
        });
    }
}