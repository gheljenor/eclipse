export const ACTION_WEAPON_ADD = Symbol("ACTION_WEAPON_ADD");
export const ACTION_WEAPON_REMOVE = Symbol("ACTION_WEAPON_REMOVE");

const weaponCounters = {};

export function actionWeaponAdd(shipId: string) {
    weaponCounters[shipId] = weaponCounters[shipId] || 0;
    const weaponId = shipId + ":" + weaponCounters[shipId]++;
    return {type: ACTION_WEAPON_ADD, shipId, weaponId};
}

export function actionWeaponRemove(shipId: string, weaponId: string) {
    return {type: ACTION_WEAPON_REMOVE, shipId, weaponId};
}
