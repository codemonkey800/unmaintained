package com.ayylmao.worldwidegamejam.actors;

import com.ayylmao.worldwidegamejam.model.Player;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input;
import com.badlogic.gdx.graphics.Texture;

public class PlayerActor extends GameActor {

    private Player playerModel;

    public PlayerActor( float x, float y, Texture texture, Player playerModel ) {
        super( x, y, texture );
        this.playerModel = playerModel;
    }

    public Player getPlayerModel() {
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

        PlayerActor that = ( PlayerActor ) o;

        if( !playerModel.equals( that.playerModel ) ) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return playerModel.hashCode();
    }
}
