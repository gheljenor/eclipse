import {Battle} from "./battle";
import {BattleScene} from "./battle-scene";
import {BattleTurn} from "./battle-turn";
import {BattleTurnPhase} from "./battle-turn-phase";
import {riftDamage, Weapon, WeaponDamageType, WeaponType} from "./weapon";

import {permutationsCountGrouped} from "../../math/permutations-count-grouped";

type BattleAttackProps = {
    hash: string;
    rolls: number[];
    rollsMap: number[];
    weaponsOverride?: Weapon[];
    maxTargetsMap: number[];
    maxHits: number;
    selfDamage: number;
    permutations: number;
};

export class BattleAttack implements BattleAttackProps {
    public readonly hash: string;
    public readonly rolls: number[];

    public readonly rollsMap: number[];
    public readonly weaponsOverride?: Weapon[];
    public readonly selfDamage: number;
    public readonly maxTargetsMap: number[];
    public readonly maxHits: number;
    public readonly permutations: number;

    constructor(props: BattleAttackProps) {
        Object.assign(this, props);
    }

    public static factory(
        battle: Battle,
        battleTurn: BattleTurn,
        battleTurnPhase: BattleTurnPhase,
        rollsGrouped: number[][],
    ) {
        let {rolls, map} = BattleAttack.rollsUngroup(rollsGrouped);

        const permutations = permutationsCountGrouped(rollsGrouped);

        let selfDamage = 0;
        let weaponsOverride;

        if (battleTurnPhase.attackers.hasRift) {
            const rift = BattleAttack.getRiftDamage(rolls, map, battleTurnPhase.attackers.weapons);
            selfDamage = rift.selfDamage;
            weaponsOverride = rift.weaponsOverride;
            rolls = rift.rollsOverride;
            map = rift.rollsMapOverride;
        }

        const maxTargetsMap = rolls.map((roll) =>
            BattleAttack.getMaxTargets(roll, battleTurnPhase.attackers.bonus, battleTurnPhase.targets.defs),
        );

        const hash = rolls.map((roll, idx) => `${map[idx]}:${maxTargetsMap[idx]}`)
            .sort().join(",") + "/" + selfDamage;

        const fullHash = battleTurnPhase.attackers.hash + "::" + battleTurnPhase.targets.hash + "::" + hash;

        const fromCache = battle.attackCache[fullHash];
        if (fromCache) {
            return fromCache;
        }

        const maxHits = BattleAttack.getMaxHits(
            rolls,
            battleTurnPhase.attackers.bonus,
            battleTurnPhase.targets.defs[battleTurnPhase.targets.defs.length - 1],
        );

        const attack = new BattleAttack({
            hash, rolls, rollsMap: map, maxTargetsMap, maxHits, permutations, selfDamage, weaponsOverride,
        });

        battle.attackCache[fullHash] = attack;

        return attack;
    }

    public static getRiftDamage(rolls, rollsMap, weapons) {
        const weaponsOverride = [...weapons];
        let selfDamage = 0;

        const rollsList = [...rolls];

        rollsList.forEach((roll, rollIdx) => {
            const weaponIdx = rollsMap[rollIdx];
            const weapon = weaponsOverride[weaponIdx];

            if (weapon.damage !== WeaponDamageType.rift) {
                return;
            }

            const rift = riftDamage[roll];

            rollsList[rollIdx] = rift.roll;
            selfDamage += (rift.selfDamage || 0);
            weaponsOverride[weaponIdx] = {type: WeaponType.gun, damage: rift.damage};
        });

        const rollsData = rollsList
            .map((roll, idx) => ({roll, rollIdx: idx, weaponIdx: rollsMap[idx]}))
            .sort((a, b) => b.roll - a.roll);

        const rollsOverride = rollsData.map(({roll}) => roll);
        const rollsMapOverride = rollsData.map(({weaponIdx}) => weaponIdx);

        return {selfDamage, weaponsOverride, rollsOverride, rollsMapOverride};
    }

    public static rollsUngroup(groupedRolls: number[][]) {
        const rollsInfo: Array<{ roll: number, map: number }> = [];
        let idx = 0;

        for (const group of groupedRolls) {
            for (const roll of group) {
                rollsInfo.push({roll, map: idx++});
            }
        }

        rollsInfo.sort((a, b) => b.roll - a.roll);

        const rolls: number[] = rollsInfo.map((a) => a.roll);
        const map: number[] = rollsInfo.map((a) => a.map);

        return {rolls, map};
    }

    public static getMaxTargets(roll: number, bonus: number, defs: number[]): number {
        const count = defs.length;

        if (roll === 6) {
            return count;
        }

        for (let i = count - 1; i >= 0; i--) {
            if (BattleAttack.isMissed(roll, bonus, defs[i])) {
                return count - i - 1;
            }
        }

        return count;
    }

    public static getMaxHits(rolls: number[], bonus: number, defence: number): number {
        for (let i = 0; i < rolls.length; i++) {
            if (BattleAttack.isMissed(rolls[i], bonus, defence)) {
                return i;
            }
        }

        return rolls.length;
    }

    public static isMissed(roll: number, bonus: number, defence: number): boolean {
        return roll !== 6 && (roll === 1 || roll + bonus < 6 + defence);
    }

    public riftSubAttack(
        battle: Battle,
        battleTurn: BattleTurn,
        battleTurnPhase: BattleTurnPhase,
        battleScene: BattleScene,
    ) {
        const phase = battleTurnPhase.riftSubPhase(battle, battleTurn, battleScene, this.selfDamage);

        const rolls = [];
        const rollsGrouped = [[]];
        for (let i = 0; i < this.selfDamage; i++) {
            rolls.push(6);
        }

        const battleAttack = BattleAttack.factory(battle, battleTurn, phase, rollsGrouped);

        return {battleTurnPhase: phase, battleAttack};
    }
}
