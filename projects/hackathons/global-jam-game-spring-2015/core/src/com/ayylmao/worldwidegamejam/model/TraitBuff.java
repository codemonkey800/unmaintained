package com.ayylmao.worldwidegamejam.model;

public class TraitBuff {

    private Character.Traits.Trait buffedTrait;
    private int amount;
    private float duration;
    private String reason;

    public TraitBuff( Character.Traits.Trait buffedTrait, int amount, float duration, String reason ) {
        this.buffedTrait = buffedTrait;
        this.amount = amount;
        this.duration = duration;
        this.reason = reason;
    }

    public Character.Traits.Trait getBuffedTrait() {
        return buffedTrait;
    }

    public void setBuffedTrait( Character.Traits.Trait buffedTrait ) {
        this.buffedTrait = buffedTrait;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount( int amount ) {
        this.amount = amount;
    }

    public float getDuration() {
        return duration;
    }

    public void setDuration( float duration ) {
        this.duration = duration;
    }

    public String getReason() {
        return reason;
    }

    public void setReason( String reason ) {
        this.reason = reason;
    }

    @Override
    public boolean equals( Object o ) {
        if( this == o ) return true;
        if( o == null || getClass() != o.getClass() ) return false;

        TraitBuff traitBuff = ( TraitBuff ) o;

        if( amount != traitBuff.amount ) return false;
        if( Float.compare( traitBuff.duration, duration ) != 0 ) return false;
        if( buffedTrait != traitBuff.buffedTrait ) return false;
        if( !reason.equals( traitBuff.reason ) ) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = buffedTrait.hashCode();
        result = 31 * result + amount;
        result = 31 * result + ( duration != +0.0f ? Float.floatToIntBits( duration ) : 0 );
        result = 31 * result + reason.hashCode();
        return result;
    }
}
