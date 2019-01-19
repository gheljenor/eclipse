import {IBattleScene, IBattleSceneTransition} from "../sim/i-battle-scene";

export type TransitionWay = Map<IBattleScene, IBattleSceneTransition[]>;

const cache: WeakMap<IBattleSceneTransition[][], TransitionWay> = new WeakMap();

export function makeInvertWay(transitions: IBattleSceneTransition[][]): TransitionWay {
    if (cache.has(transitions)) {
        return cache.get(transitions);
    }

    const invertWay: TransitionWay = new Map();

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
