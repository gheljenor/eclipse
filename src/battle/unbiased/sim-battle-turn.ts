import {Battle} from "../data/battle";
import {BattleGraph} from "../data/battle-graph";
import {BattleScene} from "../data/battle-scene";
import {BattleSceneTransition} from "../data/battle-scene-transition";
import {BattleTurn} from "../data/battle-turn";
import {BattleTurnPhase} from "../data/battle-turn-phase";

import {simBattleTurnPhase} from "./sim-battle-turn-phase";

export function simBattleTurn(
    battle: Battle,
    battleTurn: BattleTurn,
): BattleGraph {
    if (battleTurn.results) {
        return battleTurn.results;
    }

    let scenes: Map<BattleScene, number> = new Map();
    const leaves: Map<BattleScene, number> = new Map();

    scenes.set(battleTurn.startScene, 1);

    for (let i = 0; i < battle.phases.length; i++) {
        const next = new Map();

        for (const [scene, weight] of scenes) {
            if (scene.winner) {
                if (leaves.has(scene)) {
                    leaves.set(scene, leaves.get(scene) + weight);
                } else {
                    leaves.set(scene, weight);
                }
                continue;
            }

            const battleTurnPhase = BattleTurnPhase.factory(battle, battleTurn, scene, i);
            const phaseResults = simBattleTurnPhase(battle, battleTurn, battleTurnPhase);

            phaseResults.leaves.forEach((leaf) => {
                const w = weight * phaseResults.getSceneWeight(leaf);

                if (next.has(leaf)) {
                    next.set(leaf, next.get(leaf) + w);
                } else {
                    next.set(leaf, w);
                }
            });
        }

        scenes = next;
    }

    for (const [scene, weight] of scenes) {
        if (leaves.has(scene)) {
            leaves.set(scene, leaves.get(scene) + weight);
        } else {
            leaves.set(scene, weight);
        }
    }

    const transitions = [];
    for (const [scene, weight] of leaves) {
        const transition = BattleSceneTransition.factory(
            battle, battleTurn.startScene, scene, battleTurn.isFirstTurn ? "missile" : "gun",
        );
        transition.weight = weight;
        transitions.push(transition);
    }

    const results = BattleGraph.factory(
        battle, transitions, battleTurn.isFirstTurn ? null : battleTurn.startScene,
    );

    battleTurn.results = results;
    return results;
}
