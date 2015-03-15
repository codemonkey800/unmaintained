package com.ayylmao.worldwidegamejam.engine;

import com.ayylmao.worldwidegamejam.model.Player;
import com.ayylmao.worldwidegamejam.model.TraitBuff;

import java.util.HashSet;
import java.util.Set;

public class TraitEngine {
    private static Set< TraitBuff > allBuffs = new HashSet<>();

    public static void addBuff( Player player, TraitBuff buff ) {
        allBuffs.add( buff );
    }

    public static void step( float deltaTime ) {
        for( TraitBuff buff : allBuffs ) {
            if( buff.getDuration() > 0 ) {
                buff.setDuration( buff.getDuration() - deltaTime );
            } else {
                buff.setDuration( 0 );
                allBuffs.remove( buff );
            }
        }
    }
}
