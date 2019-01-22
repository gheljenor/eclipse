import {IBattleSceneTransition} from "../sim/i-battle-scene";
import {GraphWay} from "../sim/graph-way";

const cache: WeakMap<IBattleSceneTransition[][], GraphWay> = new WeakMap();

export function makeInvertWay(transitions: IBattleSceneTransition[][]): GraphWay {
    if (cache.has(transitions)) {
        return cache.get(transitions);
    }

    const invertWay: GraphWay = new Map();

    for (const layer of transitions) {
        for (const transition of layer) {
            if (!invertWay.has(transition.to)) {
                invertWay.set(transition.to, []);
            }

            invertWay.get(transition.to).push(transition);
        }
    }

    cache.set(transitions, invertWay);

    return invertWay;
}
