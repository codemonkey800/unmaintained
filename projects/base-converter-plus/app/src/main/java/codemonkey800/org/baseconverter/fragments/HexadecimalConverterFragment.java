package codemonkey800.org.baseconverter.fragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import codemonkey800.org.baseconverter.R;

public class HexadecimalConverterFragment extends BaseConverterFragment {

    public HexadecimalConverterFragment() {
    }

    public static HexadecimalConverterFragment instance() {
        return new HexadecimalConverterFragment();
    }

    @Nullable
    @Override
    public View onCreateView( LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState ) {
        View view = super.onCreateView( inflater, container, savedInstanceState );
        mMode = BaseMode.HexToDec;

        Button modeOneKey = ( Button ) view.findViewById( R.id.mode_one_key );
        Button modeTwoKey = ( Button ) view.findViewById( R.id.mode_two_key );
        final TextView baseMode = ( TextView ) view.findViewById( R.id.base_mode );

        baseMode.setText( "10" );

        modeOneKey.setText( "10" );
        modeOneKey.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {
                mMode = BaseMode.HexToDec;
                baseMode.setText( "10" );
            }
        } );
        modeTwoKey.setText( "0b" );
        modeTwoKey.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {
                mMode = BaseMode.HexToBin;
                baseMode.setText( "0b" );
            }
        } );

        return view;
    }
}
