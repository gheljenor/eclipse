import {EWeaponDamageType, EWeaponType, IWeapon} from "./i-weapon";

export const YELLOW_GUN: IWeapon = {
    type: EWeaponType.gun,
    damage: EWeaponDamageType.yellow,
};
export const YELLOW_MISSILE: IWeapon = {
    type: EWeaponType.missile,
    damage: EWeaponDamageType.yellow,
};
export const ORANGE_GUN: IWeapon = {
    type: EWeaponType.gun,
    damage: EWeaponDamageType.orange,
};
export const ORANGE_MISSILE: IWeapon = {
    type: EWeaponType.missile,
    damage: EWeaponDamageType.orange,
};
export const BLUE_GUN: IWeapon = {
    type: EWeaponType.gun,
    damage: EWeaponDamageType.blue,
};
export const RED_GUN: IWeapon = {
    type: EWeaponType.gun,
    damage: EWeaponDamageType.red,
};
export const RED_MISSILE: IWeapon = {
    type: EWeaponType.missile,
    damage: EWeaponDamageType.red,
};
export const PINK_GUN: IWeapon = {
    type: EWeaponType.gun,
    damage: EWeaponDamageType.pink,
};

export class WeaponsHelper {
    public weapons: IWeapon[] = [];

    public static factory(): WeaponsHelper {
        return new WeaponsHelper();
    }

    public addYellowGun(): this {
        this.weapons.push(YELLOW_GUN);
        return this;
    }

    public addYellowGunTurrel(): this {
        this.weapons.push(YELLOW_GUN, YELLOW_GUN);
        return this;
    }

    public addYellowMissile(): this {
        this.weapons.push(YELLOW_MISSILE, YELLOW_MISSILE);
        return this;
    }

    public addYellowMissileTurrel(): this {
        this.weapons.push(YELLOW_MISSILE, YELLOW_MISSILE, YELLOW_MISSILE);
        return this;
    }

    public addOrangeGun(): this {
        this.weapons.push(ORANGE_GUN);
        return this;
    }

    public addOrangeMissile(): this {
        this.weapons.push(ORANGE_MISSILE, ORANGE_MISSILE);
        return this;
    }

    public addBlueGun(): this {
        this.weapons.push(BLUE_GUN);
        return this;
    }

    public addBlueGunTurrel(): this {
        this.weapons.push(BLUE_GUN, BLUE_GUN);
        return this;
    }

    public addRedGun(): this {
        this.weapons.push(RED_GUN);
        return this;
    }

    public addRedMissile(): this {
        this.weapons.push(RED_MISSILE);
        return this;
    }

    public addRiftCannon(): this {
        this.weapons.push(PINK_GUN);
        return this;
    }

    public addRiftTurrel(): this {
        this.weapons.push(PINK_GUN, PINK_GUN);
        return this;
    }
}
