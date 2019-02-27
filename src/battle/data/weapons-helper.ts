import {
    blueGun,
    orangeGun,
    orangeMissile,
    redGun,
    redMissile,
    riftGun,
    riftMissile,
    Weapon,
    yellowGun,
    yellowMissile,
} from "./weapon";

export class WeaponsHelper {
    public weapons: Weapon[] = [];

    public static factory(): WeaponsHelper {
        return new WeaponsHelper();
    }

    public addYellowGun(): this {
        this.weapons.push(yellowGun);
        return this;
    }

    public addYellowGunTurret(): this {
        this.weapons.push(yellowGun, yellowGun);
        return this;
    }

    public addYellowMissile(): this {
        this.weapons.push(yellowMissile, yellowMissile);
        return this;
    }

    public addYellowMissileTurret(): this {
        this.weapons.push(yellowMissile, yellowMissile, yellowMissile);
        return this;
    }

    public addOrangeGun(): this {
        this.weapons.push(orangeGun);
        return this;
    }

    public addOrangeMissile(): this {
        this.weapons.push(orangeMissile, orangeMissile);
        return this;
    }

    public addBlueGun(): this {
        this.weapons.push(blueGun);
        return this;
    }

    public addBlueGunTurret(): this {
        this.weapons.push(blueGun, blueGun);
        return this;
    }

    public addRedGun(): this {
        this.weapons.push(redGun);
        return this;
    }

    public addRedMissile(): this {
        this.weapons.push(redMissile);
        return this;
    }

    public addRiftCannon(): this {
        this.weapons.push(riftGun);
        return this;
    }

    public addRiftTurret(): this {
        this.weapons.push(riftGun, riftGun);
        return this;
    }

    public addRiftMissile(): this {
        this.weapons.push(riftMissile);
        return this;
    }
}
