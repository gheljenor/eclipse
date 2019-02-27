import {BattleShip} from "./battle-ship";
import {WeaponDamageType, WeaponType, Weapon, yellowGun} from "./weapon";
import {Battle} from "./battle";
import {BattleScene} from "./battle-scene";
import {BattleTurn} from "./battle-turn";

import {rollsCountGrouped} from "../../math/rolls-count-grouped";

type BattleAttackersProps = {
    hash: string;
    ships: BattleShip[];
    bonus: number;
    weapons: Weapon[];
    weaponGroups: Weapon[][];
    weaponGroupsSizes: number[];
    hasRift: boolean;
    differentRollsCount: number;
};

export class BattleAttackers implements BattleAttackersProps {
    public readonly hash: string;
    public readonly ships: BattleShip[];

    public readonly bonus: number;
    public readonly weapons: Weapon[];
    public readonly weaponGroups: Weapon[][];
    public readonly weaponGroupsSizes: number[];
    public readonly hasRift: boolean;
    public readonly differentRollsCount: number;

    constructor(props: BattleAttackersProps) {
        Object.assign(this, props);
    }

    public static factory(
        battle: Battle,
        battleTurn: BattleTurn,
        battleScene: BattleScene,
        initiative: number,
    ) {
        const ships = battle.phases[initiative]
            .map((idx) => battleScene.ships[idx])
            .filter((ship) => ship.hp > 0);

        const bonus = ships[0].attack;
        const weaponType = battleTurn.isFirstTurn ? WeaponType.missile : WeaponType.gun;
        const weapons = BattleAttackers.getWeapons(ships, weaponType);

        const hash = weaponType + ":" + bonus + ":" + BattleAttackers.getWeaponsHash(weapons);

        const fromCache = battle.attackersCache[hash];
        if (fromCache) {
            return fromCache;
        }

        const hasRift = weapons.some((weapon) => weapon.damage === WeaponDamageType.rift);

        const weaponGroups = BattleAttackers.getGroups(weapons);
        const weaponGroupsSizes = weaponGroups.map((group) => group.length);

        const differentRollsCount = rollsCountGrouped(weaponGroupsSizes, 6, false);

        const attackers = new BattleAttackers({
            ships, bonus, hash, hasRift, weapons, weaponGroups, weaponGroupsSizes, differentRollsCount,
        });

        battle.attackersCache[hash] = attackers;

        return attackers;
    }

    public static factoryRift(
        battle: Battle,
        battleTurn: BattleTurn,
        battleScene: BattleScene,
        damage: number,
    ) {
        const hash = "rift:" + damage;

        const fromCache = battle.attackersCache[hash];
        if (fromCache) {
            return fromCache;
        }

        const ships = [];
        const bonus = 0;
        const weapons = [];
        const weaponGroups = [weapons];
        const weaponGroupsSizes = [damage];
        const hasRift = false;
        const differentRollsCount = 1;

        for (let i = 0; i < damage; i++) {
            weapons.push(yellowGun);
        }

        const attackers = new BattleAttackers({
            hash,
            ships,
            bonus,
            weapons,
            weaponGroupsSizes,
            weaponGroups,
            hasRift,
            differentRollsCount,
        });

        battle.attackersCache[hash] = attackers;

        return attackers;
    }

    public static getWeapons(ships: BattleShip[], weaponType: WeaponType): Weapon[] {
        const weapons: Weapon[] = [];

        ships.forEach((ship) => weapons.push(
            ...ship.weapons.filter((weapon) => weapon.type === weaponType),
        ));

        weapons.sort((a, b) => b.damage - a.damage);

        return weapons;
    }

    public static getWeaponsHash(weapons: Weapon[]): string {
        return weapons.map((weapon) => `${weapon.damage}`).join(",");
    }

    public static getGroups(weapons: Weapon[]): Weapon[][] {
        const groups: Weapon[][] = [];

        for (const weapon of weapons) {
            if (!groups[groups.length - 1] || groups[groups.length - 1][0].damage !== weapon.damage) {
                groups.push([weapon]);
            } else {
                groups[groups.length - 1].push(weapon);
            }
        }

        return groups;
    }
}
