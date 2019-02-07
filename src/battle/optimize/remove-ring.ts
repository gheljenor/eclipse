import {prepareWays} from "../select/prepare-ways";
import {IBattleScene, IBattleSceneTransition} from "../sim/i-battle-scene";
import {TGraphWay} from "../sim/t-graph-way";

type CorrectionMap = Map<IBattleSceneTransition, number>;

export function removeRing(graph: IBattleSceneTransition[], possibleRing: IBattleSceneTransition) {
    const {wayUp, wayDown} = prepareWays(graph);

    const rings = findWays(wayUp, possibleRing.to, possibleRing.from);

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

function findWays(wayUp: TGraphWay, start: IBattleScene, end: IBattleScene): IBattleSceneTransition[][] | null {
    const cache = new WeakMap();

    function findWaysUp(current: IBattleScene): IBattleSceneTransition[][] | null {
        if (!wayUp.has(current)) {
            return null;
        }

        if (cache.has(current)) {
            const fromCache = cache.get(current);
            return fromCache && fromCache.map((c) => c.slice());
        }

        const result = [];

        for (const transition of wayUp.get(current)) {
            if (transition.from === start) {
                result.push([transition]);
                continue;
            }

            const ways = findWaysUp(transition.from);

            if (ways) {
                ways.forEach((w) => w.push(transition));
                result.push(...ways);
            }
        }

        const way = result.length ? result : null;

        cache.set(current, way);

        return way;
    }

    return findWaysUp(end);
}
