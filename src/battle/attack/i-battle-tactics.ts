import {IBattleScene} from "../sim/i-battle-scene";
import {ITurnInfo} from "../sim/i-turn-info";
import {IWeaponShot} from "./i-weapon-shot";

export type IBattleTactics = (
    battleScene: IBattleScene,
    turnInfo: ITurnInfo,
    shots: IWeaponShot[],
) => number | null;
