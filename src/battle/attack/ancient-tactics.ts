import {IBattleTactics} from "./i-battle-tactics";
import {Battleship, EBattleShipType} from "../battleship";
import {ITurnInfo} from "../sim/i-turn-info";
import {IWeaponShot} from "./i-weapon-shot";
import {IBattleScene} from "../sim/i-battle-scene";

const shipWeights: Map<EBattleShipType, number> = new Map();
shipWeights.set(EBattleShipType.interceptor, 1);
shipWeights.set(EBattleShipType.cruiser, 2);
shipWeights.set(EBattleShipType.dreadnought, 3);
shipWeights.set(EBattleShipType.starbase, 4);
shipWeights.set(EBattleShipType.deathmoon, 5);

const BASE_SCORE = 8;
const KILL_WEIGHT = 10;

export const ancientTactics: IBattleTactics = function (battleScene: IBattleScene, turnInfo: ITurnInfo, shots: IWeaponShot[]): number {
    const damageLog: Map<Battleship, number> = new Map();

    shots.forEach((shot) => {
        if (!damageLog.has(shot.target)) {
            damageLog.set(shot.target, shot.weapon.damage);
        } else {
            damageLog.set(shot.target, damageLog.get(shot.target) + shot.weapon.damage);
        }
    });

    let score = 0;

    for (const [ship, damage] of damageLog) {
        const killed = ship.hp <= damage;
        const baseWeight = shipWeights.get(ship.type);

        const damageScore = Math.min(ship.hp, damage);

        score += Math.pow(BASE_SCORE, baseWeight + (killed ? KILL_WEIGHT : 0)) * (killed ? 1 : damageScore);
    }

    return score;
};
