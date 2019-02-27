import {memo} from "../../lib/memo";

import {Battle} from "./battle";
import {BattleSceneTransition} from "./battle-scene-transition";
import {BattleShip} from "./battle-ship";
import {WeaponShot} from "./weapon-shot";

type BattleSceneProps = {
    hash: string;
    ships: BattleShip[];
    hp: number;
    winner: string | null | true;
};

export class BattleScene implements BattleSceneProps {
    public readonly hash: string;
    public readonly ships: BattleShip[];
    public readonly hp: number;
    public readonly winner: string | null | true;

    public readonly byOwner = memo((owner) => {
        return this.ships.filter((ship) => ship.owner === owner);
    });

    public readonly byOwnerAlive = memo((owner) => {
        return this.ships.filter((ship) => ship.hp && ship.owner === owner);
    });

    constructor(props: BattleSceneProps) {
        Object.assign(this, props);
    }

    public static factory(
        battle: Battle,
        ships: BattleShip[],
    ) {
        const hash = BattleScene.getHash(ships);

        const fromCache = battle.sceneCache[hash];
        if (fromCache) {
            return fromCache;
        }

        const hp = BattleScene.getHp(ships);
        const winner = BattleScene.getWinner(ships);

        const battleScene = new BattleScene({hash, ships, hp, winner});

        battle.sceneCache[hash] = battleScene;

        return battleScene;
    }

    public static getHash(ships: BattleShip[]): string {
        return ships.map((ship) => ship.owner + ship.type + ship.hp).sort().join(",");
    }

    public static getHp(ships: BattleShip[]): number {
        let hp = 0;
        ships.forEach((ship) => hp += Math.max(0, ship.hp));
        return hp;
    }

    public static getWinner(ships: BattleShip[]): string | null | true {
        const aliveShips = Object.create(null);

        ships.forEach(function ({hp, owner}) {
            if (!aliveShips[owner]) {
                aliveShips[owner] = 0;
            }
            if (hp > 0) {
                aliveShips[owner]++;
            }
        });

        const owners = Object.keys(aliveShips);

        if (!aliveShips[owners[0]] && aliveShips[owners[1]]) {
            return owners[1];
        } else if (!aliveShips[owners[1]] && aliveShips[owners[0]]) {
            return owners[0];
        } else if (!aliveShips[owners[0]] && !aliveShips[owners[1]]) {
            return true;
        }

        return null;
    }

    public applyShots(battle: Battle, shots: WeaponShot[]): BattleScene {
        const damageLog: Map<BattleShip, number> = new Map();

        shots.forEach((shot) => {
            if (!damageLog.has(shot.ship)) {
                damageLog.set(shot.ship, 0);
            }
            damageLog.set(shot.ship, damageLog.get(shot.ship) + shot.weapon.damage);
        });

        const ships = [...this.ships];

        for (const [ship, damage] of damageLog) {
            const damaged = ship.clone();
            damaged.hp -= damage;
            ships.splice(ships.indexOf(ship), 1, damaged);
        }

        return BattleScene.factory(battle, ships);
    }
}
