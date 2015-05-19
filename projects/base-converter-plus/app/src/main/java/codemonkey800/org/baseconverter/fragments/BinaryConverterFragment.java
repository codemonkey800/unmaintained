package codemonkey800.org.baseconverter.fragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import codemonkey800.org.baseconverter.R;

public class BinaryConverterFragment extends BaseConverterFragment {

    public BinaryConverterFragment() {
    }

    public static BinaryConverterFragment instance() {
        return new BinaryConverterFragment();
    }

    @Nullable
    @Override
    public View onCreateView( LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState ) {
        View view = super.onCreateView( inflater, container, savedInstanceState );
        mMode = BaseMode.BinToDec;

        Button modeOneKey = ( Button ) view.findViewById( R.id.mode_one_key );
        Button modeTwoKey = ( Button ) view.findViewById( R.id.mode_two_key );
        final TextView baseMode = ( TextView ) view.findViewById( R.id.base_mode );

        baseMode.setText( "10" );

        modeOneKey.setText( "10" );
        modeOneKey.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {
                mMode = BaseMode.BinToDec;
                baseMode.setText( "10" );
            }
        } );
        modeTwoKey.setText( "0x" );
        modeTwoKey.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {
                mMode = BaseMode.BinToHex;
                baseMode.setText( "0x" );
            }
        } );

        return view;
    }
}
