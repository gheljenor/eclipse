import {IBattleSceneTransition} from "../sim/i-battle-scene";
import {TGraphWay} from "../sim/t-graph-way";

const cache: WeakMap<IBattleSceneTransition[][], TGraphWay> = new WeakMap();

export function makeInvertWay(transitions: IBattleSceneTransition[][]): TGraphWay {
    if (cache.has(transitions)) {
        return cache.get(transitions);
    }

    const invertWay: TGraphWay = new Map();

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
