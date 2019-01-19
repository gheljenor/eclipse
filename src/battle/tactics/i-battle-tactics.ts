import {Battleship} from "../battleship";

export interface IBattleTactics {
    (battleScene: Battleship[], turnInfo, shots): number;
}
