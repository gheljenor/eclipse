import {IBattleScene, IBattleSceneTransition} from "../sim/i-battle-scene";
import {IBattleGraphInfo} from "../select/i-battle-graph-info";
import {normalizeGraph} from "./normalize-graph";
import {getSceneWeight} from "../select/get-scene-weight";

export function collapseGraph(transitions: IBattleSceneTransition[][], startScene: IBattleScene, excludeStart: boolean = true): IBattleGraphInfo {
    const leaves: Set<IBattleScene> = new Set();

    transitions = normalizeGraph(transitions, startScene, excludeStart);

    for (const transition of transitions[transitions.length - 1]) {
        leaves.add(transition.to);
    }

    const scenes = Array.from(leaves);
    let total = 0;

    const result: IBattleGraphInfo = {
        scenes,
        transitions: scenes.map((scene: IBattleScene) => {
            const weight = getSceneWeight(transitions, scene);
            total += weight;
            return {from: startScene, to: scene, weight};
        })
    };

    if (Math.abs(total - 1) > 0.001) {
        for (const transition of result.transitions) {
            transition.weight /= total;
        }
    }

    return result;
}
