import {logDuration} from "../../lib/logger";
import {AttackBruteForceSolver} from "../../solvers/attack-brute-force-solver";
import {AttackGeneSolverCore} from "../../solvers/attack-gene-solver-core";
import {GeneSolver} from "../../solvers/gene-solver";
import {Battleship} from "../battleship";
import {IWeapon} from "../i-weapon";
import {battleSceneHash} from "../select/battlescene-hash";
import {countMaxHits} from "../select/count-max-hits";
import {countMaxTargets} from "../select/count-max-targets";
import {cloneBattlescene} from "../sim/clone-battlescene";
import {IBattleScene} from "../sim/i-battle-scene";
import {ITurnInfo} from "../sim/i-turn-info";
import {ancientTactics} from "./ancient-tactics";

const bruteThres = 3700;

const solvers = {
    ancient: {
        gene: new GeneSolver(new AttackGeneSolverCore(ancientTactics)),
        brute: new AttackBruteForceSolver(ancientTactics),
    },
};

const solverType = "ancient";

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

    const hits = countMaxHits(rolls, bonus, targetsDef[targetsDef.length - 1]);
    const maxTargets = countMaxTargets(rolls[0], bonus, targetsDef);

    const maxDistributions = Math.pow(maxTargets, hits);

    const solver = solvers[solverType][maxDistributions > bruteThres ? "gene" : "brute"];
    const shots = solver.calculate({battleScene, turnInfo, rolls, weapons, bonus, targets});

    if (!shots || !shots.length) {
        logDuration("SimulateAttack:" + attackId, "SimulateAttack");
        return null;
    }

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
