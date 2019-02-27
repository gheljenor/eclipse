import {logDuration} from "../../lib/logger";
import {AttackBruteForceSolver} from "../../solvers/attack-brute-force-solver";
import {AttackGeneSolverCore} from "../../solvers/attack-gene-solver-core";
import {GeneSolver} from "../../solvers/gene-solver";
import {BattleShip} from "../data/battle-ship";
import {Weapon} from "../data/weapon";
import {battleSceneHash} from "../select/battlescene-hash";
import {countMaxHits} from "../select/count-max-hits";
import {countMaxTargets} from "../select/count-max-targets";
import {cloneBattlescene} from "../sim/clone-battlescene";
import {IBattleScene} from "../sim/i-battle-scene";
import {ITurnInfo} from "../sim/i-turn-info";
import {ancientTactics} from "./ancient-tactics";
import {riftSelfDamageTactics} from "./rift-self-damage-tactics";

const bruteThres = 3700;

const solvers = {
    ancient: {
        gene: new GeneSolver(new AttackGeneSolverCore(ancientTactics)),
        brute: new AttackBruteForceSolver(ancientTactics),
    },
    rift: {
        gene: new GeneSolver(new AttackGeneSolverCore(riftSelfDamageTactics)),
        brute: new AttackBruteForceSolver(riftSelfDamageTactics),
    },
};

export function calcAttack(
    battleScene: IBattleScene,
    turnInfo: ITurnInfo,
    rolls: number[],
    weapons: Weapon[],
    bonus: number,
    targets: BattleShip[],
    targetsDef: number[],
    solverType = "ancient",
): IBattleScene | null {
    const attackId = battleSceneHash(battleScene)
        + ":" + (turnInfo.turn > 0 ? "g" : "m")
        + ":" + weaponRollsCache(rolls, weapons)
        + ":" + bonus
        + ":" + battleSceneHash({ships: targets, defender: ""});

    logDuration("SimulateAttack:" + attackId, "SimulateAttack");

    const hits = countMaxHits(rolls, bonus, targetsDef[targetsDef.length - 1]);
    const maxTargets = countMaxTargets(rolls[0], bonus, targetsDef);

    const hitRolls = rolls.slice(0, hits);
    const hitWeapons = weapons.slice(0, hits);

    const maxDistributions = Math.pow(maxTargets, hits);

    const solver = solvers[solverType][maxDistributions > bruteThres ? "gene" : "brute"];
    const shots = solver.calculate({
        battleScene,
        turnInfo,
        rolls: hitRolls,
        weapons: hitWeapons,
        bonus,
        targets,
        targetsDef,
    });

    if (!shots || !shots.length) {
        logDuration("SimulateAttack:" + attackId, "SimulateAttack");
        return null;
    }

    const result = cloneBattlescene(battleScene);
    result.ships = result.ships.concat([]);

    const damagedShips: Map<BattleShip, BattleShip> = new Map();

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

function weaponRollsCache(rolls: number[], weapons: Weapon[]): string {
    return rolls.map((roll, idx) => roll + "x" + weapons[idx].damage).join(",");
}
