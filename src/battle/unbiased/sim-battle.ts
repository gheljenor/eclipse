import {Battle} from "../data/battle";
import {BattleGraph} from "../data/battle-graph";
import {BattleTurn} from "../data/battle-turn";

import {simBattleTurn} from "./sim-battle-turn";

export function simBattle(battle: Battle): BattleGraph {
    const transitions = [];
    let scenes = [battle.startScene];
    let isFirstTurn = true;

    const allScenes = new Set();
    allScenes.add(battle.startScene);

    while (scenes.length) {
        const nextScenes = new Set();

        for (const scene of scenes) {
            const battleTurn = BattleTurn.factory(battle, scene, isFirstTurn);
            const turnResults = simBattleTurn(battle, battleTurn);

            turnResults.leaves.forEach((nextScene) => {
                if (allScenes.has(nextScene)) {
                    return;
                }
                nextScenes.add(nextScene);
                allScenes.add(nextScene);
            });

            transitions.push(...turnResults.transitions);
        }

        isFirstTurn = false;
        scenes = [...nextScenes];
    }
}
