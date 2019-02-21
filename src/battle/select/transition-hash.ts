import {IBattleSceneTransition} from "../sim/i-battle-scene";
import {battleSceneHash} from "./battlescene-hash";

export function transitionHash(transition: IBattleSceneTransition): string {
    return battleSceneHash(transition.from) + "->" + battleSceneHash(transition.to) + "[" + transition.weight + "]";
}
