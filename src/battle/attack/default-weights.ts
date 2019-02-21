import {EBattleShipType} from "../battleship";

export const shipWeights: Readonly<{ [key in EBattleShipType]: number }> = {
    [EBattleShipType.interceptor]: 1,
    [EBattleShipType.cruiser]: 2,
    [EBattleShipType.dreadnought]: 3,
    [EBattleShipType.starbase]: 4,
    [EBattleShipType.deathmoon]: 5,
};

export const BASE_SCORE = 8;
export const KILL_WEIGHT = 10;
