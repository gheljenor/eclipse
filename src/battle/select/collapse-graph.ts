import {IBattleScene, IBattleSceneTransition} from "../sim/i-battle-scene";
import {battleSceneHash} from "./battlescene-hash";
import {IBattleGraphInfo} from "./i-battle-graph-info";

export function collapseGraph(transitions: IBattleSceneTransition[][], startScene: IBattleScene, excludeStart: boolean = true): IBattleGraphInfo {
    const scenes: Map<IBattleScene, number> = new Map();
    scenes.set(startScene, 1);

    for (const layer of transitions) {
        for (const transition of layer) {
            if (!scenes.has(transition.to)) {
                scenes.set(transition.to, transition.weight * scenes.get(transition.from));
            } else {
                const weight = scenes.get(transition.to);
                scenes.set(transition.to, weight + transition.weight * scenes.get(transition.from));
            }
        }
    }

    const leaves: Set<IBattleScene> = new Set();
    const startSceneHash = battleSceneHash(startScene);

    let total = 0;

    for (const transition of transitions[transitions.length - 1]) {
        if (excludeStart) {
            const hash = battleSceneHash(transition.to);
            if (hash === startSceneHash) {
                continue;
            }
        }

        total += scenes.get(transition.to);
        leaves.add(transition.to);
    }

    const result = Array.from(leaves);

    return {
        scenes: result,
        transitions: result.map((scene: IBattleScene) => (<IBattleSceneTransition>{
            from: startScene,
            to: scene,
            weight: scenes.get(scene) / total
        }))
    };
}
