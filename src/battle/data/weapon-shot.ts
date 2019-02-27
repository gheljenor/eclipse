import {BattleShip} from "./battle-ship";
import {Weapon} from "./weapon";

export type WeaponShot = {
    weapon: Weapon;
    ship: BattleShip;
    roll: number;
};
