package com.ayylmao.worldwidegamejam.model;

import java.util.HashSet;
import java.util.Set;

public class Player extends Character {

    private Set< TraitBuff > buffs;

    public Player( String name, Traits traits, Profession profession ) {
        super( name, traits, profession );

        buffs = new HashSet<>();
    }

    public Set< TraitBuff > getBuffs() {
        return buffs;
    }

}
