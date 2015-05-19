package codemonkey800.org.baseconverter.fragments;

import android.app.Fragment;
import android.graphics.Color;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import com.melnykov.fab.FloatingActionButton;
import com.williammora.snackbar.Snackbar;

import codemonkey800.org.baseconverter.R;
import codemonkey800.org.baseconverter.models.BaseConverter;

public abstract class BaseConverterFragment extends Fragment {

    public enum BaseMode {
        DecToBin, DecToHex,
        BinToDec, BinToHex,
        HexToDec, HexToBin
    }

    protected BaseMode mMode;
    private   EditText result;

    public BaseConverterFragment() {
    }

    @Nullable
    @Override
    public View onCreateView( LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState ) {

        ViewGroup viewGroup = ( ViewGroup ) inflater.inflate( R.layout.layout_base_calculator_fragment,
                                                              container,
                                                              false );

        result = ( EditText ) viewGroup.findViewById( R.id.result );
        result.setText( "" );

        viewGroup.findViewById( R.id.zero_key ).setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {
                appendResult( "0" );
            }
        } );
        viewGroup.findViewById( R.id.one_key ).setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {
                appendResult( "1" );
            }
        } );
        viewGroup.findViewById( R.id.two_key ).setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {
                appendResult( "2" );
            }
        } );
        viewGroup.findViewById( R.id.three_key ).setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {
                appendResult( "4" );
            }
        } );
        viewGroup.findViewById( R.id.four_key ).setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {
                appendResult( "4" );
            }
        } );
        viewGroup.findViewById( R.id.five_key ).setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {
                appendResult( "5" );
            }
        } );
        viewGroup.findViewById( R.id.six_key ).setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {
                appendResult( "6" );
            }
        } );
        viewGroup.findViewById( R.id.seven_key ).setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {
                appendResult( "7" );
            }
        } );
        viewGroup.findViewById( R.id.eight_key ).setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {
                appendResult( "8" );
            }
        } );
        viewGroup.findViewById( R.id.nine_key ).setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {
                appendResult( "9" );
            }
        } );

        viewGroup.findViewById( R.id.clear_button ).setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {
                result.setText( "" );
            }
        } );

        ( ( FloatingActionButton ) viewGroup.findViewById( R.id.execute_button ) ).setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {

                if( result.getText().length() == 0 ) return;

                String number = null;

                switch( mMode ) {
                    case DecToBin:
                        try {
                            number = BaseConverter.decimalToBinary( result.getText().toString() );
                        } catch( NumberFormatException e ) {
                            printErrorMessage( "Invalid decimal number" );
                            if( number == null ) {
                                throw new NumberFormatException();
                            }
                        }
                        result.setText( number );
                        break;
                    case DecToHex:
                        try {
                            number = BaseConverter.decimalToHexadecimal( result.getText().toString() );
                            if( number == null ) {
                                throw new NumberFormatException();
                            }
                        } catch( NumberFormatException e ) {
                            printErrorMessage( "Invalid decimal number" );
                        }
                        result.setText( number );
                        break;
                    case BinToDec:
                        try {
                            number = BaseConverter.binaryToDecimal( result.getText().toString() );
                            if( number == null ) {
                                throw new NumberFormatException();
                            }
                        } catch( NumberFormatException e ) {
                            printErrorMessage( "Invalid binary number" );
                        }
                        result.setText( number );
                        break;
                    case BinToHex:
                        try {
                            number = BaseConverter.binaryToHexadecimal( result.getText().toString() );
                            if( number == null ) {
                                throw new NumberFormatException();
                            }
                        } catch( NumberFormatException e ) {
                            printErrorMessage( "Invalid binary number" );
                        }
                        result.setText( number );
                        break;
                    case HexToDec:
                        try {
                            number = BaseConverter.hexadecimalToDecimal( result.getText().toString() );
                            if( number == null ) {
                                throw new NumberFormatException();
                            }
                        } catch( NumberFormatException e ) {
                            printErrorMessage( "Invalid hexadecimal number" );
                        }
                        result.setText( number );
                        break;
                    case HexToBin:
                        try {
                            number = BaseConverter.hexadecimalToBinary( result.getText().toString() );
                            if( number == null ) {
                                throw new NumberFormatException();
                            }
                        } catch( NumberFormatException e ) {
                            printErrorMessage( "Invalid hexadecimal number" );
                        }
                        result.setText( number );
                        break;
                }
            }
        } );

        return viewGroup;

    }

    private void appendResult( String val ) {
        if( isInteger( val ) ) {
            result.setText( result.getText() + val );
        }
    }

    private boolean isInteger( String val ) {
        try {
            Integer.parseInt( val );
            return true;
        } catch( NumberFormatException e ) {
            return false;
        }
    }

    private void printErrorMessage( String message ) {
        Snackbar.with( getActivity() )
                .text( message )
                .color( Color.parseColor( "#e51c23" ) )
                .show( getActivity() );
    }
}
