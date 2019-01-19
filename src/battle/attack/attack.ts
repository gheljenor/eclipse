import {IBattleScene} from "../sim/i-battle-scene";
import {ITurnInfo} from "../sim/i-turn-info";
import {IWeapon} from "../i-weapon";
import {Battleship} from "../battleship";

export function attack(battleScene: IBattleScene, turnInfo: ITurnInfo, rolls: number[], weapons: IWeapon[], bonus: number, targets: Battleship[]): IBattleScene | null {
    return battleScene;
}
