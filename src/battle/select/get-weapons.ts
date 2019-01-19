import {Battleship} from "../battleship";
import {IWeapon, EWeaponType} from "../IWeapon";

export function getWeapons(ships: Battleship[], type: EWeaponType): IWeapon[] {
    const weapons: IWeapon[] = [];

    ships.forEach((ship) => {
        weapons.push(...ship.weapons.filter((weapon) => weapon.type === type));
    });

    return weapons;
}
