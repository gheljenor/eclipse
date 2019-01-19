import {Battleship} from "../battleship";

export interface IBattleScene {
    ships: Battleship[];
    defender: string;
    winner?: string | null;
}

export interface IBattleSceneTransition {
    from: IBattleScene;
    to: IBattleScene;
    weight: number;
}

export function cloneBattlescene(battleScene: IBattleScene): IBattleScene {
    return {
        ships: battleScene.ships,
        defender: battleScene.defender,
        winner: battleScene.winner
    };
}
