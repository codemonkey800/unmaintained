package codemonkey800.org.baseconverter.activities;

import android.os.Bundle;

import codemonkey800.org.baseconverter.R;

public class MainActivity extends BaseActivity {

    @Override
    protected void onCreate( Bundle savedInstanceState ) {
        super.onCreate( savedInstanceState );
        mDrawer.setSelection( 0 );
        setContentFragment( 0 );
    }

    @Override
    protected int getLayoutResource() {
        return R.layout.layout_main;
    }
}
