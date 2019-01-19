import {IBattleScene} from "./i-battle-scene";
import {ITurnInfo} from "./i-turn-info";
import {IWeapon} from "../IWeapon";
import {Battleship} from "../battleship";

export function attack(battleScene: IBattleScene, turnInfo: ITurnInfo, rolls: number[], weapons: IWeapon[], bonus: number, targets: Battleship[]): IBattleScene | null {
    return battleScene;
}
