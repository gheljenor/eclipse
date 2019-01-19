import {IBattleScene} from "./i-battle-scene";

export function cloneBattlescene(battleScene: IBattleScene): IBattleScene {
    return {
        ships: battleScene.ships,
        defender: battleScene.defender,
        winner: battleScene.winner
    };
}
