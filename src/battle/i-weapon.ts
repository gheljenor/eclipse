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
