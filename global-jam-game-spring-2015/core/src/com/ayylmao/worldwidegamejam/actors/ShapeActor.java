package com.ayylmao.worldwidegamejam.actors;

import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.g2d.Batch;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer;
import com.badlogic.gdx.scenes.scene2d.Actor;

public class ShapeActor extends Actor {

    private ShapeRenderer renderer;

    public ShapeActor( float x, float y, float width, float height, Color color ) {
        setX( x );
        setY( y );
        setWidth( width );
        setHeight( height );
        setColor( color );

        renderer = new ShapeRenderer();
    }

    @Override
    public void draw( Batch batch, float parentAlpha ) {
        batch.end();

        renderer.setProjectionMatrix( batch.getProjectionMatrix() );
        renderer.setTransformMatrix( batch.getTransformMatrix() );
        renderer.translate( getX(), getY(), 0 );

        renderer.begin( ShapeRenderer.ShapeType.Filled );

        renderer.setColor( getColor() );
        renderer.rect( 0, 0, getWidth(), getHeight() );

        renderer.end();

        batch.begin();
    }
}
