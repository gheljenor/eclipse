import {logDuration} from "../../lib/logger";
import {Battleship} from "../battleship";
import {IWeapon} from "../i-weapon";
import {battleSceneHash} from "../select/battlescene-hash";
import {cloneBattlescene} from "../sim/clone-battlescene";
import {IBattleScene} from "../sim/i-battle-scene";
import {ITurnInfo} from "../sim/i-turn-info";
import {ancientTactics} from "./ancient-tactics";
import {IWeaponShot} from "./i-weapon-shot";
import {AttackSolverCore, IAttackSolverData} from "../../gene/attack-solver-core";
import {GeneSolver} from "../../gene/gene-solver";

const ancientAttackSolverCore = new AttackSolverCore(ancientTactics);
const ancientAttackSolver = new GeneSolver(ancientAttackSolverCore);

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

    const solver: GeneSolver<IWeaponShot[], IAttackSolverData> = ancientAttackSolver;

    const shots = solver.calculate({battleScene, turnInfo, rolls, weapons, bonus, targets});

    const result = cloneBattlescene(battleScene);
    result.ships = result.ships.concat([]);

    const damagedShips: Map<Battleship, Battleship> = new Map();

    for (const shot of shots) {
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
