export enum WeaponDamageType {
    yellow = 1,
    orange = 2,
    blue = 3,
    red = 4,
    pink
}

export enum WeaponType {
    missile = "missile",
    gun = "gun"
}

export interface Weapon {
    type: WeaponType;
    damage: WeaponDamageType;
}

export const yellowGun: Weapon = {
    type: WeaponType.gun,
    damage: WeaponDamageType.yellow
};

export const yellowMissile: Weapon = {
    type: WeaponType.missile,
    damage: WeaponDamageType.yellow
};

export const orangeGun: Weapon = {
    type: WeaponType.gun,
    damage: WeaponDamageType.orange
};

export const orangeMissile: Weapon = {
    type: WeaponType.missile,
    damage: WeaponDamageType.orange
};

export const blueGun: Weapon = {
    type: WeaponType.gun,
    damage: WeaponDamageType.blue
};

export const redGun: Weapon = {
    type: WeaponType.gun,
    damage: WeaponDamageType.red
};

export const redMissile: Weapon = {
    type: WeaponType.missile,
    damage: WeaponDamageType.red
};

export const pinkGun: Weapon = {
    type: WeaponType.gun,
    damage: WeaponDamageType.pink
};

export class WeaponsHelper {
    weapons: Weapon[] = [];

    static factory(): WeaponsHelper {
        return new WeaponsHelper();
    }

    addYellowGun(): this {
        this.weapons.push(yellowGun);
        return this;
    }

    addYellowGunTurrel(): this {
        this.weapons.push(yellowGun, yellowGun);
        return this;
    }

    addYellowMissile(): this {
        this.weapons.push(yellowMissile, yellowMissile);
        return this;
    }

    addYellowMissileTurrel(): this {
        this.weapons.push(yellowMissile, yellowMissile, yellowMissile);
        return this;
    }

    addOrangeGun(): this {
        this.weapons.push(orangeGun);
        return this;
    }

    addOrangeMissile(): this {
        this.weapons.push(orangeMissile, orangeMissile);
        return this;
    }

    addBlueGun(): this {
        this.weapons.push(blueGun);
        return this;
    }

    addBlueGunTurrel(): this {
        this.weapons.push(blueGun, blueGun);
        return this;
    }

    addRedGun(): this {
        this.weapons.push(redGun);
        return this;
    }

    addRedMissile(): this {
        this.weapons.push(redMissile);
        return this;
    }

    addRiftCannon(): this {
        this.weapons.push(pinkGun);
        return this;
    }

    addRiftTurrel(): this {
        this.weapons.push(pinkGun, pinkGun);
        return this;
    }
}
