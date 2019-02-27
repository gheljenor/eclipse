import {BattleShip} from "../data/battle-ship";

export interface IBattleScene {
    ships: BattleShip[];
    defender: string;
    winner?: string | null | true;
}

export interface IBattleSceneTransition {
    from: IBattleScene;
    to: IBattleScene;
    weight: number;
    posibleRing?: boolean;
}
