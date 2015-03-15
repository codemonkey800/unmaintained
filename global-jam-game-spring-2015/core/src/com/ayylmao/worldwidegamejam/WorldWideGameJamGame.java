package com.ayylmao.worldwidegamejam;


import com.ayylmao.worldwidegamejam.actors.PlayerActor;
import com.ayylmao.worldwidegamejam.model.Character;
import com.ayylmao.worldwidegamejam.model.Player;
import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.GL30;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.utils.viewport.ScreenViewport;

public class WorldWideGameJamGame extends ApplicationAdapter {

    private Stage stage;

    private OrthographicCamera camera;

    @Override
    public void create() {
        camera = new OrthographicCamera();

        stage = new Stage();
        stage.setViewport( new ScreenViewport() );

        Player model = new Player( "Player", new Character.Traits( 0, 0, 0, 0 ), Character.Profession.DEVELOPER );

        PlayerActor actor = new PlayerActor( 10, 10,
                                             new Texture( Gdx.files.internal( "assets/maps/basement.jpg" ) ),
                                             model );

        stage.addActor( actor );

        Gdx.input.setInputProcessor( stage );
    }

    @Override
    public void resize( int width, int height ) {
        super.resize( width, height );
        stage.getViewport().update( width, height, true );
    }

    @Override
    public void render() {
        Gdx.gl.glClear( GL30.GL_COLOR_BUFFER_BIT );
        stage.act( Gdx.graphics.getDeltaTime() );
        stage.draw();
    }

    @Override
    public void dispose() {
        super.dispose();
        stage.dispose();
    }


}
