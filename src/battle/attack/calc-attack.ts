import {root} from "postcss";
import {ELogLevel, log, logDuration} from "../../lib/logger";
import {Battleship} from "../battleship";
import {IWeapon} from "../i-weapon";
import {battleSceneHash} from "../select/battlescene-hash";
import {cloneBattlescene} from "../sim/clone-battlescene";
import {IBattleScene} from "../sim/i-battle-scene";
import {ITurnInfo} from "../sim/i-turn-info";
import {ancientTactics} from "./ancient-tactics";
import {distributeRolls} from "./distribute-rolls";
import {IBattleTactics} from "./i-battle-tactics";
import {IWeaponShot} from "./i-weapon-shot";

const avaliableTactics = {
    ancient: ancientTactics,
};

// Need to think about this function... It's very complex for now: O(rolls ^ targets)
// With alliances it's possible to have rolls count about 360, and possible targets count about 54...
// I have not found similar NP problem, so i hope to found some O(rolls * targets) solution...

// UPD: It seems to be similar to Bin Packing Problem: https://en.wikipedia.org/wiki/Bin_packing_problem
// But we must maximize some score, not bins count...

export function calcAttack(
    battleScene: IBattleScene,
    turnInfo: ITurnInfo,
    rolls: number[],
    weapons: IWeapon[],
    bonus: number,
    targets: Battleship[],
): IBattleScene | null {
    const attackId = battleSceneHash(battleScene)
        + ":" + (turnInfo.turn > 0 ? "g" : "m")
        + ":" + weaponRollsCache(rolls, weapons)
        + ":" + bonus
        + ":" + battleSceneHash({ships: targets, defender: ""});

    logDuration("SimulateAttack:" + attackId, "SimulateAttack");

    const targetsDef = targets.map(({defence}) => defence);

    const tactics: IBattleTactics = avaliableTactics.ancient;

    let maxScore: number = 0;
    let bestShots: IWeaponShot[] = null;

    let distributions = 0;
    for (const dist of distributeRolls(rolls, bonus, targetsDef)) {
        if (dist.length === 0) {
            logDuration("SimulateAttack:" + attackId, "SimulateAttack");
            return null;
        }

        const shots: IWeaponShot[] = dist.map((targetIdx, weaponIdx) => ({
            target: targets[targetIdx],
            weapon: weapons[weaponIdx],
            roll: rolls[weaponIdx],
        }));

        const score = tactics(battleScene, turnInfo, shots);

        if (maxScore < score) {
            maxScore = score;
            bestShots = shots;
        }

        distributions++;
    }

    log(ELogLevel.debug, "SimulateAttack:" + attackId, "distributions", distributions);

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

    logDuration("SimulateAttack:" + attackId, "SimulateAttack");
    return result;
}

function weaponRollsCache(rolls: number[], weapons: IWeapon[]): string {
    return rolls.map((roll, idx) => roll + "x" + weapons[idx].damage).join(",");
}
