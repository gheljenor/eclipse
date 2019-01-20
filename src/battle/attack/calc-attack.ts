import {IBattleScene} from "../sim/i-battle-scene";
import {ITurnInfo} from "../sim/i-turn-info";
import {IWeapon} from "../i-weapon";
import {Battleship} from "../battleship";
import {IBattleTactics} from "./i-battle-tactics";
import {IWeaponShot} from "./i-weapon-shot";
import {cloneBattlescene} from "../sim/clone-battlescene";
import {ancientTactics} from "./ancient-tactics";
import {distributeRolls} from "./distribute-rolls";

const avaliableTactics = {
    ancient: ancientTactics
};

export function calcAttack(battleScene: IBattleScene, turnInfo: ITurnInfo, rolls: number[], weapons: IWeapon[], bonus: number, targets: Battleship[]): IBattleScene | null {
    const targetsDef = targets.map(({defence}) => defence);

    const tactics: IBattleTactics = avaliableTactics.ancient;

    let maxScore: number = 0;
    let bestShots: IWeaponShot[] = null;

    for (const dist of distributeRolls(rolls, bonus, targetsDef)) {
        if (dist.length === 0) {
            return null;
        }

        const shots: IWeaponShot[] = dist.map((targetIdx, weaponIdx) => (<IWeaponShot>{
            target: targets[targetIdx],
            weapon: weapons[weaponIdx]
        }));

        const score = tactics(battleScene, turnInfo, shots);
        if (maxScore < score) {
            maxScore = score;
            bestShots = shots;
        }
    }

    const result = cloneBattlescene(battleScene);
    result.ships = result.ships.concat([]);

    const damagedShips: Map<Battleship, Battleship> = new Map();

    for (const shot of bestShots) {
        if (!damagedShips.has(shot.target)) {
            damagedShips.set(shot.target, shot.target.clone());
        }

        const ship = damagedShips.get(shot.target);
        ship.hp -= shot.weapon.damage;
        ship.hp = Math.max(0, ship.hp);
    }

    for (const [original, damaged] of damagedShips) {
        result.ships.splice(result.ships.indexOf(original), 1, damaged);
    }

    return result;
}
