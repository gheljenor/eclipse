import {Battleship} from "../battleship";
import {IWeapon} from "../i-weapon";

export interface IWeaponShot {
    weapon: IWeapon;
    roll: number;
    target: Battleship;
}
