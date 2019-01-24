import {IBattleGraphInfo} from "../select/i-battle-graph-info";
import {IBattleScene, IBattleSceneTransition} from "./i-battle-scene";

import {removeRing} from "../optimize/remove-ring";
import {battleSceneHash} from "../select/battlescene-hash";
import {initiativePhases} from "../select/initiative-phases";
import {simulateTurn} from "./simulate-turn";

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

            nextScenes.push(...result.scenes.filter((nextScene) => {
                const hash = battleSceneHash(nextScene);

                if (scenesCache[hash]) {
                    return false;
                }

                if (turn > 0) {
                    scenesCache[hash] = nextScene;
                }

                return !nextScene.winner;
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
        transitions: graph,
    };
}
