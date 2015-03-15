package com.ayylmao.worldwidegamejam.engine;

import com.ayylmao.worldwidegamejam.model.Character;
import com.ayylmao.worldwidegamejam.model.Player;

import java.util.Random;

public class RecruitmentEngine {

    private static final Random rand = new Random();

    public static boolean recruit( Player player, Character character ) {
        return rand.nextInt( 10 ) + 1 <= player.getTraits().getSocial();
    }

}
