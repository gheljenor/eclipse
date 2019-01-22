import {IBattleScene, IBattleSceneTransition} from "../sim/i-battle-scene";
import {makeInvertWay} from "./make-invert-way";
import {GraphWay} from "../sim/graph-way";

export function getSceneWeight(transitions: IBattleSceneTransition[][], targetScene: IBattleScene): number {
    const invertWay: GraphWay = makeInvertWay(transitions);
    return recursiveWayUp(invertWay, targetScene);
}

function recursiveWayUp(invertWay: GraphWay, scene: IBattleScene): number {
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
