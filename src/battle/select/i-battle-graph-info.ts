import {IBattleScene, IBattleSceneTransition} from "../sim/i-battle-scene";

export interface IBattleGraphInfo {
    scenes: IBattleScene[];
    transitions: IBattleSceneTransition[];
}
