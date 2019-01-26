import {IBattleScene, IBattleSceneTransition} from "../sim/i-battle-scene";
import {TGraphWay} from "../sim/t-graph-way";
import {makeInvertWay} from "./make-invert-way";

export function getSceneWeightByLayers(transitions: IBattleSceneTransition[][], targetScene: IBattleScene): number {
    const wayUp: TGraphWay = makeInvertWay(transitions);
    return getSceneWeightByGraphWay(wayUp, targetScene);
}

export function getSceneWeightByGraphWay(wayUp: TGraphWay, scene: IBattleScene): number {
    const ways: IBattleSceneTransition[] = wayUp.get(scene);

    if (!ways || ways.length === 0) {
        return 1;
    }

    let result = 0;
    for (const way of ways) {
        result += way.weight * getSceneWeightByGraphWay(wayUp, way.from);
    }

    return result;
}
