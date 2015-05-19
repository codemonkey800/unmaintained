    package codemonkey800.org.baseconverter.activities;

import android.content.res.TypedArray;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.widget.Toolbar;
import android.view.Gravity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.FrameLayout;
import android.widget.ListView;

import java.util.ArrayList;

import codemonkey800.org.baseconverter.R;
import codemonkey800.org.baseconverter.adapters.NavigationDrawerAdapter;
import codemonkey800.org.baseconverter.fragments.ArbitraryBaseConverterFragment;
import codemonkey800.org.baseconverter.fragments.BaseConverterFragment;
import codemonkey800.org.baseconverter.fragments.BinaryConverterFragment;
import codemonkey800.org.baseconverter.fragments.DecimalConverterFragment;
import codemonkey800.org.baseconverter.fragments.HexadecimalConverterFragment;
import codemonkey800.org.baseconverter.models.NavigationDrawerListItem;

public abstract class BaseActivity extends ActionBarActivity {

    protected Toolbar      mToolbar;
    protected DrawerLayout mDrawerLayout;
    protected ListView     mDrawer;
    protected FrameLayout  mContentFrame;

    @Override
    protected void onCreate( Bundle savedInstanceState ) {
        super.onCreate( savedInstanceState );
        setContentView( getLayoutResource() );

        mToolbar = ( Toolbar ) findViewById( R.id.toolbar );
        mDrawerLayout = ( DrawerLayout ) findViewById( R.id.drawer_layout );
        mDrawer = ( ListView ) findViewById( R.id.drawer );
        mContentFrame = ( FrameLayout ) findViewById( R.id.fragment_container );

        mDrawerLayout.setDrawerShadow( R.drawable.drawer_shadow, Gravity.START );
        mDrawerLayout.setScrimColor( Color.TRANSPARENT );

        final ArrayList< NavigationDrawerListItem > drawerItems = new ArrayList< NavigationDrawerListItem >();
        String[] drawerTitles = getResources().getStringArray( R.array.drawer_item_titles );
        TypedArray drawerIcons = getResources().obtainTypedArray( R.array.drawer_item_icons );

        for( int i = 0; i < drawerTitles.length; i++ ) {
            drawerItems.add( new NavigationDrawerListItem( drawerIcons.getResourceId( i, -1 ), drawerTitles[ i ] ) );
        }

        drawerIcons.recycle();

        mDrawer.setAdapter( new NavigationDrawerAdapter( this, drawerItems ) );
        mDrawer.setOnItemClickListener( new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick( AdapterView< ? > parent, View view, int position, long id ) {
                mDrawer.setSelection( position );
                mDrawerLayout.closeDrawer( mDrawer );

                mToolbar.setTitle( drawerItems.get( position ).getTitle() );
                mToolbar.setNavigationIcon( drawerItems.get( position ).getIcon() );

                setContentFragment( position );
            }
        } );

        mToolbar.setTitle( drawerItems.get( 0 ).getTitle() );
        mToolbar.setNavigationIcon( drawerItems.get( 0 ).getIcon() );


        mToolbar.setNavigationIcon( R.drawable.ic_brand_logo );
        mToolbar.setNavigationOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick( View v ) {
                mDrawerLayout.openDrawer( mDrawer );
            }
        } );

    }

    protected void setContentFragment( int positon ) {

        BaseConverterFragment fragment = null;

        switch( positon ) {
            case 0:
                fragment = DecimalConverterFragment.instance();
                break;
            case 1:
                fragment = BinaryConverterFragment.instance();
                break;
            case 2:
                fragment = HexadecimalConverterFragment.instance();
                break;
            case 3:
                fragment = ArbitraryBaseConverterFragment.instance();
                break;
        }

        if( fragment == null ) {
            return;
        }

        getFragmentManager().beginTransaction()
                            .replace( R.id.fragment_container, fragment )
                            .commit();

    }

    protected abstract int getLayoutResource();
}