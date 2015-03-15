package com.ayylmao.worldwidegamejam.model;

public class Character {

    private String name;
    private Traits traits;
    private Profession profession;

    public Character( String name, Traits traits, Profession profession ) {
        this.name = name;
        this.traits = traits;
        this.profession = profession;
    }

    public String getName() {
        return name;
    }

    public void setName( String name ) {
        this.name = name;
    }

    public Traits getTraits() {
        return traits;
    }

    public void setTraits( Traits traits ) {
        this.traits = traits;
    }

    public Profession getProfession() {
        return profession;
    }

    public void setProfession( Profession profession ) {
        this.profession = profession;
    }

    @Override
    public boolean equals( Object o ) {
        if( this == o ) return true;
        if( o == null || getClass() != o.getClass() ) return false;

        Character character = ( Character ) o;

        if( !name.equals( character.name ) ) return false;
        if( profession != character.profession ) return false;
        if( !traits.equals( character.traits ) ) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = name.hashCode();
        result = 31 * result + traits.hashCode();
        result = 31 * result + profession.hashCode();
        return result;
    }

    public static class Traits {

        public enum Trait {
            SWEG, SOCIAL, SKILLS, FIGHT_SKILLS
        }

        private int sweg;
        private int social;
        private int skills;
        private int fightSkills;

        public Traits( int sweg, int social, int skills, int fightSkills ) {
            this.sweg = sweg;
            this.social = social;
            this.skills = skills;
            this.fightSkills = fightSkills;
        }

        public int getSweg() {
            return sweg;
        }

        public void setSweg( int sweg ) {
            this.sweg = sweg;
        }

        public int getSocial() {
            return social;
        }

        public void setSocial( int social ) {
            this.social = social;
        }

        public int getSkills() {
            return skills;
        }

        public void setSkills( int skills ) {
            this.skills = skills;
        }

        public int getFightSkills() {
            return fightSkills;
        }

        public void setFightSkills( int fightSkills ) {
            this.fightSkills = fightSkills;
        }

        @Override
        public boolean equals( Object o ) {
            if( this == o ) return true;
            if( o == null || getClass() != o.getClass() ) return false;

            Traits traits = ( Traits ) o;

            if( fightSkills != traits.fightSkills ) return false;
            if( skills != traits.skills ) return false;
            if( social != traits.social ) return false;
            if( sweg != traits.sweg ) return false;

            return true;
        }

        @Override
        public int hashCode() {
            int result = sweg;
            result = 31 * result + social;
            result = 31 * result + skills;
            result = 31 * result + fightSkills;
            return result;
        }
    }

    public enum Profession {
        PROGRAMMER, ARTIST, DEVELOPER, OTHER
    }

}
