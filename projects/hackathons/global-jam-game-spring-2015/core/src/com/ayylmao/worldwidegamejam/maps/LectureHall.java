package com.ayylmao.worldwidegamejam.maps;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;

public class LectureHall extends Map{

	public LectureHall() {
		super( new Texture( Gdx.files.internal( "assets/maps/basement.jpg" ) ), 1280, 720 );

	}

}
