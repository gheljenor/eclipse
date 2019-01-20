import {EBattleShipType} from "../battleship";

export const shipWeights: Map<EBattleShipType, number> = new Map();

shipWeights.set(EBattleShipType.interceptor, 1);
shipWeights.set(EBattleShipType.cruiser, 2);
shipWeights.set(EBattleShipType.dreadnought, 3);
shipWeights.set(EBattleShipType.starbase, 4);
shipWeights.set(EBattleShipType.deathmoon, 5);

export const BASE_SCORE = 8;
export const KILL_WEIGHT = 10;
