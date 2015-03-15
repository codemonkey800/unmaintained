package com.ayylmao.worldwidegamejam.maps;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;

public class RoomThree extends Map {

	public RoomThree() {
		super( new Texture( Gdx.files.internal( "maps/lecture-hall.jpg" ) ), 1280, 720 );
	}

}