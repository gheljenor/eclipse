import {showTransition} from "../../../test/battle/_tools/show-transition";
import {collapseGraph} from "../optimize/collapse-graph";
import {simplifyGraph} from "../optimize/simplify-graph";
import {battleSceneHash} from "../select/battlescene-hash";
import {getWinner} from "../select/get-winner";
import {IBattleGraphInfo} from "../select/i-battle-graph-info";
import {initiativePhases} from "../select/initiative-phases";
import {shipsByPhase} from "../select/ships-by-phase";
import {IBattleScene, IBattleSceneTransition} from "./i-battle-scene";
import {ITurnInfo} from "./i-turn-info";
import {simulatePhase} from "./simulate-phase";

export function simulateTurn(battleScene: IBattleScene, turn: number, phases?: number[][]): IBattleGraphInfo {
    if (!phases) {
        phases = initiativePhases(battleScene);
    }

    let scenes: IBattleScene[] = [battleScene];
    const graph: IBattleSceneTransition[][] = [];
    const lashPhase = phases[phases.length - 1];

    for (const phase of phases) {
        const phaseTransitions: IBattleSceneTransition[] = [];

        const sampleShip = scenes[0].ships[phase[0]];

        const turnInfo: ITurnInfo = {
            player: sampleShip.owner,
            defender: battleScene.defender === sampleShip.owner,
            initiative: sampleShip.initiative,
            turn,
        };

        for (const scene of scenes) {
            const ships = shipsByPhase(scene.ships, phase);

            const transitions = simulatePhase(scene, turnInfo, ships);

            if (phase === lashPhase) {
                endOfTurn(transitions);
            }

            phaseTransitions.push(...transitions);
        }

        const simplified = simplifyGraph(phaseTransitions);
        scenes = simplified.scenes;
        graph.push(simplified.transitions);
    }

    return collapseGraph(graph, battleScene, turn !== 0);
}

function endOfTurn(transitions: IBattleSceneTransition[]) {
    for (const transition of transitions) {
        transition.to.winner = getWinner(transition.to.ships);

        if (transition.to.winner) {
            continue;
        }

        let ships = transition.to.ships;
        ships = transition.to.ships = [].concat(ships);
        for (let i = 0, l = ships.length; i < l; i++) {
            let ship = ships[i];
            if (ship.hp > 0 && ship.heal > 0 && ship.maxHp > ship.hp) {
                ships[i] = ship = ship.clone();
                ship.hp = Math.min(ship.hp + ship.heal, ship.maxHp);
            }
        }
    }
}
