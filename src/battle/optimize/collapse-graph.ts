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

    return {
        scenes,
        transitions: scenes.map((scene: IBattleScene) => (<IBattleSceneTransition>{
            from: startScene,
            to: scene,
            weight: getSceneWeight(transitions, scene)
        }))
    };
}
