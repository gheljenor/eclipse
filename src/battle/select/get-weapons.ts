import {Battleship} from "../battleship";
import {EWeaponType, IWeapon} from "../i-weapon";

export function getWeapons(ships: Battleship[], type: EWeaponType): IWeapon[] {
    const weapons: IWeapon[] = [];

    ships.forEach((ship) => {
        weapons.push(...ship.weapons.filter((weapon) => weapon.type === type));
    });

    return weapons;
}
