import {IBattleScene, IBattleSceneTransition} from "../sim/i-battle-scene";
import {battleSceneHash} from "./battlescene-hash";
import {IBattleGraphInfo} from "./i-battle-graph-info";

export function simplifyGraph(transitions: IBattleSceneTransition[]): IBattleGraphInfo {
    const sceneCache: { [hash: string]: IBattleScene } = Object.create(null);
    const transitionCache: { [hash: string]: IBattleSceneTransition } = Object.create(null);

    for (const transition of transitions) {
        const fromHash: string = battleSceneHash(transition.from);
        const toHash: string = battleSceneHash(transition.to);

        const transHash: string = fromHash + ":" + sceneCache;

        if (transitionCache[transHash]) {
            transitionCache[transHash].weight += transition.weight;
            continue;
        }

        if (!sceneCache[toHash]) {
            sceneCache[toHash] = transition.to;
        }
        const to: IBattleScene = sceneCache[toHash];

        if (transition.to === to) {
            transitionCache[transHash] = transition;
        } else {
            transitionCache[transHash] = {
                from: transition.from,
                to,
                weight: transition.weight
            };
        }
    }

    return {
        transitions: Object.values(transitionCache),
        scenes: Object.values(sceneCache)
    };
}
