import {IBattleScene} from "../sim/i-battle-scene";
import {Battleship} from "../battleship";
import {getWeapons} from "../select/get-weapons";
import {EWeaponDamageType, EWeaponType} from "../i-weapon";
import {cloneBattlescene} from "../sim/clone-battlescene";
import {distributeRolls} from "./distribute-rolls";
import {BASE_SCORE, KILL_WEIGHT, shipWeights} from "./default-weights";

export function riftSelfDamage(battlescene: IBattleScene, damage: number, attacker: string): IBattleScene {
    const result = cloneBattlescene(battlescene);
    result.ships = result.ships.concat([]);

    const riftShips: Map<Battleship, number> = new Map();

    for (const ship of battlescene.ships) {
        if (ship.owner !== attacker) {
            continue;
        }
        const weapons = getWeapons([ship], EWeaponType.gun);
        let count = 0;

        for (const weapon of weapons) {
            if (weapon.damage === EWeaponDamageType.pink) {
                count++;
            }
        }

        if (count) {
            riftShips.set(ship, count);
        }
    }

    const rolls = [];
    for (let i = 0; i < damage; i++) {
        rolls.push(6);
    }

    const ships = Array.from(riftShips.keys());
    const damagedShips: Map<Battleship, Battleship> = new Map();

    let bestScore: number = 0;
    let bestDist: number[];

    for (const dist of distributeRolls(rolls, 0, ships.map(() => 0))) {
        const score = getScore(dist, ships, riftShips);

        if (score === 0) {
            continue;
        }

        if (bestScore === 0 || bestScore > score) {
            bestScore = score;
            bestDist = dist;
        }
    }

    for (const idx of bestDist) {
        const ship = ships[idx];
        if (!damagedShips.has(ship)) {
            damagedShips.set(ship, ship.clone());
        }
        damagedShips.get(ship).hp--;
    }

    for (const [original, damaged] of damagedShips) {
        damaged.hp = Math.max(0, damaged.hp);
        result.ships.splice(result.ships.indexOf(original), 1, damaged);
    }

    return result;
}

function getScore(dist: number[], ships: Battleship[], riftShips: Map<Battleship, number>): number {
    const damages: Map<Battleship, number> = new Map();
    const killed: Set<Battleship> = new Set();
    const fullDamaged: Set<Battleship> = new Set();

    for (const idx of dist) {
        const ship = ships[idx];

        if (!damages.has(ship)) {
            damages.set(ship, 0)
        }

        const damage = damages.get(ship) + 1;
        const maxDamage = riftShips.get(ship);

        if (damage > maxDamage) {
            return 0;
        }

        damages.set(ship, damage);

        if (damage >= ship.hp) {
            killed.add(ship);
        }

        if (damage === maxDamage) {
            fullDamaged.add(ship);
        }
    }

    const overdamageAllowed = killed.size === ships.length || fullDamaged.size === ships.length;
    let score = 0;

    for (const [ship, damage] of damages) {
        if (ship.hp < damage && !overdamageAllowed) {
            return 0;
        }

        const killed = ship.hp <= damage;
        const baseWeight = shipWeights.get(ship.type);
        const realDamage = Math.min(ship.hp, damage);

        score += Math.pow(BASE_SCORE, baseWeight + (killed ? KILL_WEIGHT : 0)) * (killed ? 1 : realDamage);
    }

    return score;
}
