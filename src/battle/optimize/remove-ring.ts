import {prepareWays} from "../select/prepare-ways";
import {IBattleScene, IBattleSceneTransition} from "../sim/i-battle-scene";
import {TGraphWay} from "../sim/t-graph-way";

type CorrectionMap = Map<IBattleSceneTransition, number>;

export function removeRing(graph: IBattleSceneTransition[], possibleRing: IBattleSceneTransition) {
    const {wayUp, wayDown} = prepareWays(graph);

    const rings = findWaysUp(wayUp, possibleRing.from, possibleRing.to);

    if (!rings) {
        delete possibleRing.posibleRing;
        return;
    }

    graph.splice(graph.indexOf(possibleRing), 1);

    const ringStartWays = wayDown.get(possibleRing.from);
    ringStartWays.splice(ringStartWays.indexOf(possibleRing), 1);

    const correctionList: CorrectionMap[] = [];

    for (const ring of rings) {
        const corrections: CorrectionMap = new Map();

        let correction = possibleRing.weight;
        for (const step of ring.reverse()) {
            correction *= step.weight;
            corrections.set(step, correction);
        }

        correctionList.push(corrections);
    }

    for (const correctionMap of correctionList) {
        for (const [transition, correction] of correctionMap) {
            transition.weight -= correction;
        }
    }

    for (const transitions of wayDown.values()) {
        let total = 0;
        for (const transition of transitions) {
            total += transition.weight;
        }
        for (const transition of transitions) {
            transition.weight /= total;
        }
    }
}

function findWaysUp(wayUp: TGraphWay, from: IBattleScene, to: IBattleScene): IBattleSceneTransition[][] | null {
    if (!wayUp.has(from)) {
        return null;
    }

    const result = [];

    for (const transition of wayUp.get(from)) {
        if (transition.from === to) {
            result.push([transition]);
            continue;
        }

        const ways = findWaysUp(wayUp, transition.from, to);

        if (ways) {
            ways.forEach((way) => way.push(transition));
            result.push(...ways);
        }
    }

    return result.length ? result : null;
}
