package com.ayylmao.worldwidegamejam.maps;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;

public class RoomOne extends Map {

	public RoomOne() {
		super( new Texture( Gdx.files.internal( "maps/lecture-hall.jpg" ) ), 1280, 720 );
	}

}
