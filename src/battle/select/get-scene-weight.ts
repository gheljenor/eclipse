import {IBattleScene, IBattleSceneTransition} from "../sim/i-battle-scene";
import {makeInvertWay, TransitionWay} from "./make-invert-way";

export function getSceneWeight(transitions: IBattleSceneTransition[][], targetScene: IBattleScene): number {
    const invertWay: TransitionWay = makeInvertWay(transitions);
    return recursiveWayUp(invertWay, targetScene);
}

function recursiveWayUp(invertWay: TransitionWay, scene: IBattleScene): number {
    const ways: IBattleSceneTransition[] = invertWay.get(scene);

    if (!ways || ways.length === 0) {
        return 1;
    }

    let result = 0;
    for (const way of ways) {
        result += way.weight * recursiveWayUp(invertWay, way.from);
    }

    return result;
}
