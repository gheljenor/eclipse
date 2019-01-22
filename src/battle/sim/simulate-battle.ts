import {IBattleScene, IBattleSceneTransition} from "./i-battle-scene";
import {IBattleGraphInfo} from "../select/i-battle-graph-info";

import {initiativePhases} from "../select/initiative-phases";
import {simulateTurn} from "./simulate-turn";
import {battleSceneHash} from "../select/battlescene-hash";
import {removeRing} from "../optimize/remove-ring";

export function simulateBattle(battleScene: IBattleScene): IBattleGraphInfo {
    const phases = initiativePhases(battleScene);

    const graph: IBattleSceneTransition[] = [];
    const leaves: IBattleScene[] = [];

    const scenesCache: Map<string, IBattleScene> = new Map();

    let scenes = [battleScene];
    let turn = 0;

    while (scenes.length) {
        const nextScenes: IBattleScene[] = [];
        const possibleRing: IBattleSceneTransition[] = [];

        for (const scene of scenes) {
            const result = simulateTurn(scene, turn, phases);
            graph.push(...result.transitions);
            leaves.push(...result.scenes.filter(({winner}) => winner));

            nextScenes.push(...result.scenes.filter((scene) => {
                const hash = battleSceneHash(scene);

                if (scenesCache[hash]) {
                    return false;
                }

                if (turn > 0) {
                    scenesCache[hash] = scene;
                }

                return !scene.winner;
            }));

            if (turn > 0) {
                for (const transition of result.transitions) {
                    const hash = battleSceneHash(transition.to);
                    const fromCache = scenesCache[hash];

                    if (fromCache !== transition.to) {
                        transition.to = fromCache;
                        possibleRing.push(transition);
                        transition.posibleRing = true;
                    }
                }
            }
        }

        possibleRing.forEach((transition) => removeRing(graph, transition));

        scenes = nextScenes;
        turn++;
    }

    return {
        scenes: leaves,
        transitions: graph
    };
}
