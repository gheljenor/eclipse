import {IBattleSceneTransition} from "../sim/i-battle-scene";
import {TGraphWay} from "../sim/t-graph-way";

export function prepareWays(graph: IBattleSceneTransition[]): { wayUp: TGraphWay, wayDown: TGraphWay } {
    const wayDown: TGraphWay = new Map();
    const wayUp: TGraphWay = new Map();

    for (const transition of graph) {
        if (!wayDown.has(transition.from)) {
            wayDown.set(transition.from, []);
        }
        wayDown.get(transition.from).push(transition);

        if (transition.posibleRing) {
            continue;
        }

        if (!wayUp.has(transition.to)) {
            wayUp.set(transition.to, []);
        }
        wayUp.get(transition.to).push(transition);
    }

    return {wayDown, wayUp};
}
