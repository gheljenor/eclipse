import {IBattleScene} from "../sim/i-battle-scene";
import {ITurnInfo} from "../sim/i-turn-info";
import {YELLOW_GUN} from "../weapons-helper";
import {calcAttack} from "./calc-attack";

export function riftSelfDamage(battlescene: IBattleScene, damage: number, turnInfo: ITurnInfo): IBattleScene {
    const rolls = [];
    const rollWeapons = [];

    for (let i = 0; i < damage; i++) {
        rolls.push(6);
        rollWeapons.push(YELLOW_GUN);
    }

    const targets = battlescene.ships.filter((ship) => ship.hp && ship.owner === turnInfo.player);
    const targetsDef = targets.map((ship) => ship.defence);

    return calcAttack(battlescene, turnInfo, rolls, rollWeapons, 0, targets, targetsDef, "rift");
}
