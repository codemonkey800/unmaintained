package com.ayylmao.worldwidegamejam.desktop;

import com.badlogic.gdx.backends.lwjgl.LwjglApplication;
import com.badlogic.gdx.backends.lwjgl.LwjglApplicationConfiguration;
import com.ayylmao.worldwidegamejam.WorldWideGameJamGame;

public class DesktopLauncher {
	public static void main (String[] arg) {
		LwjglApplicationConfiguration config = new LwjglApplicationConfiguration();

		config.title = "2 Nights At Game Dev";
		config.width = 1280;
		config.height = 720;
		new LwjglApplication(new WorldWideGameJamGame(), config);
	}
}
