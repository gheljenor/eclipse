import {Battle} from "../data/battle";
import {BattleAttack} from "../data/battle-attack";
import {BattleGraph} from "../data/battle-graph";
import {BattleSceneTransition} from "../data/battle-scene-transition";
import {BattleTurn} from "../data/battle-turn";
import {BattleTurnPhase} from "../data/battle-turn-phase";

import {simBattleAttack} from "../attack/sim-battle-attack";

import {generateRollsGrouped} from "../../math/generate-rolls-grouped";

export function simBattleTurnPhase(
    battle: Battle,
    battleTurn: BattleTurn,
    battleTurnPhase: BattleTurnPhase,
): BattleGraph {
    if (battleTurnPhase.results) {
        return battleTurnPhase.results;
    }

    const transitions: Set<BattleSceneTransition> = new Set();
    const total = battleTurnPhase.attackers.differentRollsCount;

    for (const rollsGrouped of generateRollsGrouped(battleTurnPhase.attackers.weaponGroupsSizes)) {
        const battleAttack = BattleAttack.factory(battle, battleTurn, battleTurnPhase, rollsGrouped);

        const fromCache = battleTurnPhase.attackCache[battleAttack.hash];
        if (fromCache) {
            fromCache.weight += battleAttack.permutations / total;
            continue;
        }

        let resultScene;

        if (battleAttack.maxTargetsMap[0] > 0) {
            resultScene = simBattleAttack(
                battle, battleTurn, battleTurnPhase, battleAttack, "ancient",
            );
        } else {
            resultScene = battleTurnPhase.startScene;
        }

        if (battleAttack.selfDamage > 0) {
            const subAttack = battleAttack.riftSubAttack(battle, battleTurn, battleTurnPhase, resultScene);
            resultScene = simBattleAttack(
                battle, battleTurn, subAttack.battleTurnPhase, subAttack.battleAttack, "rift-stupid",
            );
        }

        const transition = BattleSceneTransition.factory(
            battle, battleTurnPhase.startScene, resultScene, battleTurnPhase.hash,
        );
        transition.weight += battleAttack.permutations / total;

        transitions.add(transition);
        battleTurnPhase.attackCache[battleAttack.hash] = transition;
    }

    const results = BattleGraph.factory(battle, Array.from(transitions));
    battleTurnPhase.results = results;
    return results;
}
