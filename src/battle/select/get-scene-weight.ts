import {IBattleScene, IBattleSceneTransition} from "../sim/i-battle-scene";
import {TGraphWay} from "../sim/t-graph-way";
import {makeInvertWay} from "./make-invert-way";

type cacheItem = {
    wayUp: TGraphWay,
    cache: Map<IBattleScene, number>,
};

const caches: WeakMap<IBattleSceneTransition[][], cacheItem> = new WeakMap();

export function getSceneWeightByLayers(transitions: IBattleSceneTransition[][], targetScene: IBattleScene): number {
    if (!caches.has(transitions)) {
        const ways: TGraphWay = makeInvertWay(transitions);
        caches.set(transitions, {wayUp: ways, cache: new Map()});
    }

    const {cache, wayUp} = caches.get(transitions);

    return getSceneWeightByGraphWay(wayUp, targetScene, cache);
}

export function getSceneWeightByGraphWay(
    wayUp: TGraphWay,
    scene: IBattleScene,
    cache?: Map<IBattleScene, number>,
): number {
    if (!cache) {
        cache = new Map();
    }

    if (cache.has(scene)) {
        return cache.get(scene);
    }

    const ways: IBattleSceneTransition[] = wayUp.get(scene);

    if (!ways || ways.length === 0) {
        return 1;
    }

    let result = 0;
    for (const way of ways) {
        result += way.weight * getSceneWeightByGraphWay(wayUp, way.from, cache);
    }

    cache.set(scene, result);
    return result;
}
