package codemonkey800.org.baseconverter.fragments;

import android.graphics.Color;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import com.melnykov.fab.FloatingActionButton;
import com.williammora.snackbar.Snackbar;

import codemonkey800.org.baseconverter.R;
import codemonkey800.org.baseconverter.models.BaseConverter;

public class ArbitraryBaseConverterFragment extends BaseConverterFragment {

    private EditText result;
    private EditText inputBase;

    public ArbitraryBaseConverterFragment() {
    }

    public static ArbitraryBaseConverterFragment instance() {
        return new ArbitraryBaseConverterFragment();
    }

    @Nullable
    @Override
    public View onCreateView( LayoutInflater inflater, final ViewGroup container, Bundle savedInstanceState ) {

        final ViewGroup viewGroup = ( ViewGroup ) inflater.inflate( R.layout.layout_n_base_calculator_fragment,
                                                                    container,
                                                                    false );

        result = ( EditText ) viewGroup.findViewById( R.id.result );
        result.setText( "" );

        inputBase = ( EditText ) viewGroup.findViewById( R.id.in_base );

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
                String inputBase = ( ( EditText ) viewGroup.findViewById( R.id.in_base ) ).getText().toString();
                String outputBase = ( ( EditText ) viewGroup.findViewById( R.id.out_base ) ).getText().toString();

                if( !isInteger( inputBase ) ) {
                    printErrorMessage( "Invalid input base" );
                    return;
                } else if( !isInteger( outputBase ) ) {
                    printErrorMessage( "Invalid output base" );
                    return;
                }

                try {
                    result.setText( BaseConverter.convertBase( result.getText().toString(),
                                                               Integer.parseInt( inputBase ),
                                                               Integer.parseInt( outputBase ) ) );
                } catch( NumberFormatException e ) {
                    printErrorMessage( "Cannot convert base" );
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
