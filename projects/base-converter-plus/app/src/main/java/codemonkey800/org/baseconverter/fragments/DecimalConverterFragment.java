package codemonkey800.org.baseconverter.fragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import codemonkey800.org.baseconverter.R;

public class DecimalConverterFragment extends BaseConverterFragment {

    public DecimalConverterFragment() {
    }

    public static DecimalConverterFragment instance() {
        return new DecimalConverterFragment();
    }

    @Nullable
    @Override
    public View onCreateView( LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState ) {
        View view = super.onCreateView( inflater, container, savedInstanceState );
        mMode = BaseMode.DecToBin;

        Button modeOneKey = ( Button ) view.findViewById( R.id.mode_one_key );
        Button modeTwoKey = ( Button ) view.findViewById( R.id.mode_two_key );
        final TextView baseMode = ( TextView ) view.findViewById( R.id.base_mode );

        baseMode.setText( "0b" );

        modeOneKey.setText( "0b" );
        modeOneKey.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {
                mMode = BaseMode.DecToBin;
                baseMode.setText( "0b" );
            }
        } );
        modeTwoKey.setText( "0x" );
        modeTwoKey.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {
                mMode = BaseMode.DecToHex;
                baseMode.setText( "0x" );
            }
        } );

        return view;
    }
}
