package com.ayylmao.worldwidegamejam.actors;

import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.Batch;
import com.badlogic.gdx.scenes.scene2d.Actor;

public abstract class GameActor extends Actor {

    protected Texture texture;
    protected float x, y;

    public GameActor( float x, float y, Texture texture ) {
        this.x = x;
        this.y = y;
        this.texture = texture;
    }

    @Override
    public void draw( Batch batch, float parentAlpha ) {
        batch.draw( texture, x, y, 100, 100 );
    }

}
