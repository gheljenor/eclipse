export enum EWeaponDamageType {
    yellow = 1,
    orange = 2,
    blue = 3,
    red = 4,
    pink,
}

export enum EWeaponType {
    missile = "missile",
    gun = "gun",
}

export interface IWeapon {
    type: EWeaponType;
    damage: EWeaponDamageType;
}

export interface IRiftDamage {
    roll: number;
    damage: number;
    selfDamage?: number;
}

export const riftDamage: { [roll: number]: IRiftDamage } = {
    1: {roll: 1, damage: 0},
    2: {roll: 1, damage: 0},
    3: {roll: 1, damage: 0, selfDamage: 1},
    4: {roll: 6, damage: 1},
    5: {roll: 6, damage: 2},
    6: {roll: 6, damage: 3, selfDamage: 1},
};
