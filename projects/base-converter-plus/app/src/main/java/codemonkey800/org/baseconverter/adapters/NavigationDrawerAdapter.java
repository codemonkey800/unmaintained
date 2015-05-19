package codemonkey800.org.baseconverter.adapters;

import android.content.Context;
import android.support.v7.app.ActionBarActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;

import codemonkey800.org.baseconverter.R;
import codemonkey800.org.baseconverter.models.NavigationDrawerListItem;

public class NavigationDrawerAdapter extends BaseAdapter {

    private Context                               mContext;
    private ArrayList< NavigationDrawerListItem > mDrawerItems;

    public NavigationDrawerAdapter( Context context, ArrayList< NavigationDrawerListItem > drawerItems ) {
        mContext = context;
        mDrawerItems = drawerItems;
    }

    @Override
    public int getCount() {
        return mDrawerItems.size();
    }

    @Override
    public Object getItem( int position ) {
        return mDrawerItems.get( position );
    }

    @Override
    public long getItemId( int position ) {
        return position;
    }

    @Override
    public View getView( int position, View convertView, ViewGroup parent ) {
        if( convertView == null ) {
            LayoutInflater inflater = ( ( ActionBarActivity ) mContext ).getLayoutInflater();
            convertView = inflater.inflate( R.layout.layout_nav_drawer_item, null );
        }

        ImageView icon = ( ImageView ) convertView.findViewById( R.id.drawer_item_icon );
        TextView title = ( TextView ) convertView.findViewById( R.id.drawer_item_title );

        icon.setImageResource( mDrawerItems.get( position ).getIcon() );
        title.setText( mDrawerItems.get( position ).getTitle() );

        return convertView;
    }
}
