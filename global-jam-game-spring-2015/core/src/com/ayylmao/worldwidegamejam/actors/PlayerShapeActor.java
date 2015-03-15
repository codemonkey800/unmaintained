package com.ayylmao.worldwidegamejam.actors;

import com.ayylmao.worldwidegamejam.model.Player;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input;
import com.badlogic.gdx.graphics.Color;

public class PlayerShapeActor extends ShapeActor {

    private Player playerModel;

    public PlayerShapeActor( float x, float y, float width, float height, Color color, Player playerModel ) {
        super( x, y, width, height, color );
        this.playerModel = playerModel;
    }

    public Player getModel() {
        return playerModel;
    }

    @Override
    public void act( float delta ) {
        if( Gdx.input.isKeyPressed( Input.Keys.W ) ) {
            setY( getY() + 5 );
        }
        if( Gdx.input.isKeyPressed( Input.Keys.S ) ) {
            setY( getY() - 5 );
        }
        if( Gdx.input.isKeyPressed( Input.Keys.A ) ) {
            setX( getX() - 5 );
        }
        if( Gdx.input.isKeyPressed( Input.Keys.D ) ) {
            setX( getX() + 5 );
        }
    }

    @Override
    public boolean equals( Object o ) {
        if( this == o ) return true;
        if( o == null || getClass() != o.getClass() ) return false;

        PlayerShapeActor that = ( PlayerShapeActor ) o;

        if( !playerModel.equals( that.playerModel ) ) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return playerModel.hashCode();
    }
}
