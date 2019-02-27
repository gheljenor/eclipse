export enum WeaponDamageType {
    yellow = 1,
    orange = 2,
    blue = 3,
    red = 4,
    rift,
}

export enum WeaponType {
    missile,
    gun,
}

export type Weapon = {
    type: WeaponType;
    damage: WeaponDamageType;
};

export const yellowGun: Weapon = {
    type: WeaponType.gun,
    damage: WeaponDamageType.yellow,
};

export const yellowMissile: Weapon = {
    type: WeaponType.missile,
    damage: WeaponDamageType.yellow,
};

export const orangeGun: Weapon = {
    type: WeaponType.gun,
    damage: WeaponDamageType.orange,
};

export const orangeMissile: Weapon = {
    type: WeaponType.missile,
    damage: WeaponDamageType.orange,
};

export const blueGun: Weapon = {
    type: WeaponType.gun,
    damage: WeaponDamageType.blue,
};

export const blueMissile: Weapon = {
    type: WeaponType.missile,
    damage: WeaponDamageType.blue,
};

export const redGun: Weapon = {
    type: WeaponType.gun,
    damage: WeaponDamageType.red,
};

export const redMissile: Weapon = {
    type: WeaponType.missile,
    damage: WeaponDamageType.red,
};

export const riftGun: Weapon = {
    type: WeaponType.gun,
    damage: WeaponDamageType.rift,
};

export const riftMissile: Weapon = {
    type: WeaponType.missile,
    damage: WeaponDamageType.rift,
};

export type RiftDamage = {
    roll: number;
    damage: number;
    selfDamage?: number;
};

export const riftDamage: { [roll: number]: RiftDamage } = {
    1: {roll: 1, damage: 0},
    2: {roll: 1, damage: 0},
    3: {roll: 1, damage: 0, selfDamage: 1},
    4: {roll: 6, damage: 1},
    5: {roll: 6, damage: 2},
    6: {roll: 6, damage: 3, selfDamage: 1},
};
