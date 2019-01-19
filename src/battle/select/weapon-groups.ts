import {IWeapon} from "../i-weapon";

export function weaponGroups(weapons: IWeapon[]): IWeapon[][] {
    const groups: IWeapon[][] = [];

    for (const weapon of weapons) {
        if (!groups[groups.length - 1] || groups[groups.length - 1][0].damage !== weapon.damage) {
            groups.push([weapon]);
        } else {
            groups[groups.length - 1].push(weapon);
        }
    }

    return groups;
}
