import {BattleShip} from "../data/battle-ship";
import {Weapon} from "../data/weapon";

export interface IWeaponShot {
    weapon: Weapon;
    target: BattleShip;
    roll?: number;
}
