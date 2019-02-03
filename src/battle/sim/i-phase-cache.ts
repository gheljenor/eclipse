import {IBattleSceneTransition} from "./i-battle-scene";

export interface IPhaseCache {
    [key: string]: IBattleSceneTransition[];
}
