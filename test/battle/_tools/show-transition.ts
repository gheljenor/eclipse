import {battleSceneHash} from "../../../src/battle/select/battlescene-hash";
import {IBattleSceneTransition} from "../../../src/battle/sim/i-battle-scene";

export function showTransition(transition: IBattleSceneTransition): string {
    return JSON.stringify({
        from: battleSceneHash(transition.from),
        to: battleSceneHash(transition.to),
        weight: transition.weight,
    });
}
