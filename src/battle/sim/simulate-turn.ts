import {IBattleScene, IBattleSceneTransition} from "./i-battle-scene";
import {ITurnInfo} from "./i-turn-info";
import {shipsByPhase} from "../select/ships-by-phase";
import {initiativePhases} from "../select/initiative-phases";
import {simulatePhase} from "./simulate-phase";
import {IBattleGraphInfo} from "../select/i-battle-graph-info";
import {cloneBattlescene} from "./clone-battlescene";
import {simplifyGraph} from "../optimize/simplify-graph";
import {collapseGraph} from "../optimize/collapse-graph";

export function simulateTurn(battleScene: IBattleScene, turn: number, phases?: number[][]): IBattleGraphInfo {
    if (!phases) {
        phases = initiativePhases(battleScene);
    }

    let scenes: IBattleScene[] = [battleScene];
    const graph: IBattleSceneTransition[][] = [];

    for (const phase of phases) {
        const phaseTransitions: IBattleSceneTransition[] = [];

        const sampleShip = scenes[0].ships[0];

        const turnInfo: ITurnInfo = {
            player: sampleShip.owner,
            defender: battleScene.defender == sampleShip.owner,
            initiative: sampleShip.initiative,
            turn,
        };

        for (const scene of scenes) {
            const ships = shipsByPhase(scene.ships, phase);

            if (!ships.length) {
                phaseTransitions.push({
                    from: scene,
                    to: cloneBattlescene(scene),
                    weight: 1
                });
                continue;
            }

            const transitions = simulatePhase(battleScene, turnInfo, ships);
            phaseTransitions.push(...transitions);
        }

        const simplified = simplifyGraph(phaseTransitions);
        scenes = simplified.scenes;
        graph.push(simplified.transitions);
    }

    return collapseGraph(graph, battleScene, turn === 0);
}
