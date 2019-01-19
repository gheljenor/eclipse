import {IBattleScene, IBattleSceneTransition} from "../sim/i-battle-scene";

type TransitionWay = Map<IBattleScene, IBattleSceneTransition[]>;

const cache: WeakMap<IBattleSceneTransition[][], TransitionWay> = new WeakMap();

export function getSceneWeight(transitions: IBattleSceneTransition[][], targetScene: IBattleScene): number {
    const invertWay: TransitionWay = makeInvertWay(transitions);
    return recursiveWayUp(invertWay, targetScene);
}

function makeInvertWay(transitions: IBattleSceneTransition[][]): TransitionWay {
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

function recursiveWayUp(invertWay: TransitionWay, scene: IBattleScene): number {
    const ways: IBattleSceneTransition[] = invertWay.get(scene);

    if (!ways || ways.length === 0) {
        return 1;
    }

    let result = 0;
    for (const way of ways) {
        result += way.weight * recursiveWayUp(invertWay, way.from);
    }

    return result;
}
