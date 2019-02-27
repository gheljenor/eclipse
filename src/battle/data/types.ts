import {BattleScene} from "./battle-scene";
import {BattleSceneTransition} from "./battle-scene-transition";

export type SceneCache = { [key: string]: BattleScene };
export type SceneListCache = { [key: string]: BattleScene[]; };

export type TransitionCache = { [key: string]: BattleSceneTransition; };
export type TransitionListCache = { [key: string]: BattleSceneTransition[]; };
