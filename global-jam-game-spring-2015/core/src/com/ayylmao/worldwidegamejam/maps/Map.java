package com.ayylmao.worldwidegamejam.maps;

import com.ayylmao.worldwidegamejam.actors.GameActor;
import com.badlogic.gdx.graphics.Texture;

public abstract class Map extends GameActor {

    private int width, height;

    public Map( Texture texture, int width, int height ) {
        super( 0, 0, texture );
        this.width = width;
        this.height = height;
    }
}
