import {Battleship} from "../battleship";
import {ITurnInfo} from "../sim/i-turn-info";
import {IWeaponShot} from "./i-weapon-shot";
import {IBattleScene} from "../sim/i-battle-scene";

export interface IBattleTactics {
    (battleScene: IBattleScene, turnInfo: ITurnInfo, shots: IWeaponShot[]): number;
}
