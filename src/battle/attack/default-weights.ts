import {BattleShipType} from "../data/battle-ship";

export const shipWeights: Readonly<{ [key in BattleShipType]: number }> = {
    [BattleShipType.interceptor]: 1,
    [BattleShipType.cruiser]: 2,
    [BattleShipType.dreadnought]: 3,
    [BattleShipType.starbase]: 4,
    [BattleShipType.deathmoon]: 5,
};

export const BASE_SCORE = 8;
export const KILL_WEIGHT = 10;
