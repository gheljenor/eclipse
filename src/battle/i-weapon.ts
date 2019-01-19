export enum EWeaponDamageType {
    yellow = 1,
    orange = 2,
    blue = 3,
    red = 4,
    pink
}

export enum EWeaponType {
    missile = "missile",
    gun = "gun"
}

export interface IWeapon {
    type: EWeaponType;
    damage: EWeaponDamageType;
}

export const YELLOW_GUN: IWeapon = {
    type: EWeaponType.gun,
    damage: EWeaponDamageType.yellow
};

export const YELLOW_MISSILE: IWeapon = {
    type: EWeaponType.missile,
    damage: EWeaponDamageType.yellow
};

export const ORANGE_GUN: IWeapon = {
    type: EWeaponType.gun,
    damage: EWeaponDamageType.orange
};

export const ORANGE_MISSILE: IWeapon = {
    type: EWeaponType.missile,
    damage: EWeaponDamageType.orange
};

export const BLUE_GUN: IWeapon = {
    type: EWeaponType.gun,
    damage: EWeaponDamageType.blue
};

export const RED_GUN: IWeapon = {
    type: EWeaponType.gun,
    damage: EWeaponDamageType.red
};

export const RED_MISSILE: IWeapon = {
    type: EWeaponType.missile,
    damage: EWeaponDamageType.red
};

export const PINK_GUN: IWeapon = {
    type: EWeaponType.gun,
    damage: EWeaponDamageType.pink
};

export class WeaponsHelper {
    weapons: IWeapon[] = [];

    static factory(): WeaponsHelper {
        return new WeaponsHelper();
    }

    addYellowGun(): this {
        this.weapons.push(YELLOW_GUN);
        return this;
    }

    addYellowGunTurrel(): this {
        this.weapons.push(YELLOW_GUN, YELLOW_GUN);
        return this;
    }

    addYellowMissile(): this {
        this.weapons.push(YELLOW_MISSILE, YELLOW_MISSILE);
        return this;
    }

    addYellowMissileTurrel(): this {
        this.weapons.push(YELLOW_MISSILE, YELLOW_MISSILE, YELLOW_MISSILE);
        return this;
    }

    addOrangeGun(): this {
        this.weapons.push(ORANGE_GUN);
        return this;
    }

    addOrangeMissile(): this {
        this.weapons.push(ORANGE_MISSILE, ORANGE_MISSILE);
        return this;
    }

    addBlueGun(): this {
        this.weapons.push(BLUE_GUN);
        return this;
    }

    addBlueGunTurrel(): this {
        this.weapons.push(BLUE_GUN, BLUE_GUN);
        return this;
    }

    addRedGun(): this {
        this.weapons.push(RED_GUN);
        return this;
    }

    addRedMissile(): this {
        this.weapons.push(RED_MISSILE);
        return this;
    }

    addRiftCannon(): this {
        this.weapons.push(PINK_GUN);
        return this;
    }

    addRiftTurrel(): this {
        this.weapons.push(PINK_GUN, PINK_GUN);
        return this;
    }
}
