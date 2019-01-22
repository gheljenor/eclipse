import {IBattleScene, IBattleSceneTransition} from "../sim/i-battle-scene";
import {GraphWay} from "../sim/graph-way";

export function removeRing(graph: IBattleSceneTransition[], possibleRing: IBattleSceneTransition) {
    const {wayUp, wayDown} = prepareWays(graph);

    const ring = findWayUp(wayUp, possibleRing.from, possibleRing.to);

    if (!ring) {
        delete possibleRing.posibleRing;
        return;
    }

    graph.splice(graph.indexOf(possibleRing), 1);

    const ringStartWays = wayDown.get(possibleRing.from);
    ringStartWays.splice(ringStartWays.indexOf(possibleRing), 1);

    const side = getSideNodes(wayDown, ring);
    const {wayDown: sideTransitions} = prepareWays(side);

    let correction = 1;
    for (const transition of ring) {
        correction *= transition.weight;
    }

    correction = 1 / (1 - correction);

    for (const layer of ring) {
        for (const transition of sideTransitions.get(layer.from)) {
            transition.weight *= correction;
        }

        const weight = layer.weight;
        layer.weight = 1 - (1 - layer.weight) * correction;
        correction *= weight / layer.weight;
    }
}

function prepareWays(graph: IBattleSceneTransition[]): { wayUp: GraphWay, wayDown: GraphWay } {
    const wayUp: GraphWay = new Map();
    const wayDown: GraphWay = new Map();

    for (const transition of graph) {
        if (!wayDown.has(transition.to)) {
            wayDown.set(transition.to, []);
        }
        wayDown.get(transition.to).push(transition);

        if (transition.posibleRing) {
            continue;
        }

        if (!wayUp.has(transition.from)) {
            wayUp.set(transition.from, []);
        }
        wayUp.get(transition.from).push(transition);
    }

    return {wayUp, wayDown};
}

function findWayUp(wayUp: GraphWay, from: IBattleScene, to: IBattleScene): IBattleSceneTransition[] | null {
    if (!wayUp.has(from)) {
        return null;
    }

    // FIXME: колец может быть более одного. Нужно учесть этот сценарий

    for (const transition of wayUp.get(from)) {
        if (transition.from === to) {
            return [transition];
        }

        const result = findWayUp(wayUp, transition.from, to);

        if (result) {
            result.push(transition);
            return result;
        }
    }

    return null;
}

function getSideNodes(wayDown: GraphWay, way: IBattleSceneTransition[]): IBattleSceneTransition[] {
    const result: IBattleSceneTransition[] = [];

    for (const transition of way) {
        result.push(...wayDown.get(transition.from).filter((child) => transition !== child));
    }

    return result;
}
