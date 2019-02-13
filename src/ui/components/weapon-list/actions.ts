export const ACTION_WEAPON_ADD = Symbol("ACTION_WEAPON_ADD");
export const ACTION_WEAPON_REMOVE = Symbol("ACTION_WEAPON_REMOVE");

const weaponCounters = {};

type WeaponAction<Type> = {
    type: Type;
    shipId: string;
    weaponId: string;
};

export function actionWeaponAdd(shipId: string): WeaponAction<typeof ACTION_WEAPON_ADD> {
    weaponCounters[shipId] = weaponCounters[shipId] || 0;
    const weaponId: string = shipId + ":" + weaponCounters[shipId]++;
    return {type: ACTION_WEAPON_ADD, shipId, weaponId};
}

export function actionWeaponRemove(shipId: string, weaponId: string): WeaponAction<typeof ACTION_WEAPON_REMOVE> {
    return {type: ACTION_WEAPON_REMOVE, shipId, weaponId};
}
