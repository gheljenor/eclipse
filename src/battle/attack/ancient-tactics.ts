import {Battleship} from "../battleship";
import {IBattleScene} from "../sim/i-battle-scene";
import {ITurnInfo} from "../sim/i-turn-info";
import {BASE_SCORE, KILL_WEIGHT, shipWeights} from "./default-weights";
import {IBattleTactics} from "./i-battle-tactics";
import {IWeaponShot} from "./i-weapon-shot";

export const ancientTactics: IBattleTactics
    = function (battleScene: IBattleScene, turnInfo: ITurnInfo, shots: IWeaponShot[]): number {
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
