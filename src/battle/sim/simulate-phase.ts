import {ELogLevel, log, logDuration} from "../../lib/logger";
import {generateRollsGrouped} from "../../math/generate-rolls-grouped";
import {permutationsCountGrouped} from "../../math/permutations-count-grouped";
import {rollsCountGrouped} from "../../math/rolls-count-grouped";
import {calcAttack} from "../attack/calc-attack";
import {riftSelfDamage} from "../attack/rift-self-damage";
import {Battleship} from "../battleship";
import {EWeaponDamageType, EWeaponType, IWeapon, riftDamage} from "../i-weapon";
import {battleSceneHash} from "../select/battlescene-hash";
import {countMaxTargets} from "../select/count-max-targets";
import {getWeapons} from "../select/get-weapons";
import {rollsUngroup} from "../select/rolls-ungroup";
import {shipsByOwner} from "../select/ships-by-owner";
import {weaponGroups} from "../select/weapon-groups";
import {cloneBattlescene} from "./clone-battlescene";
import {IBattleScene, IBattleSceneTransition} from "./i-battle-scene";
import {IPhaseCache} from "./i-phase-cache";
import {ITurnInfo} from "./i-turn-info";

export function simulatePhase(
    battleScene: IBattleScene,
    turnInfo: ITurnInfo,
    attackers: Battleship[],
    phaseCache: IPhaseCache = {},
): IBattleSceneTransition[] {
    const phaseId = (turnInfo.turn > 0 ? "g" : "m") + ":" + battleSceneHash(battleScene) + ":" + battleSceneHash({
        ships: attackers,
        defender: "",
    });

    if (phaseCache[phaseId]) {
        return fromCache(phaseId, phaseCache, battleScene);
    }

    logDuration("SimulatePhase:" + phaseId, "SimulatePhase");

    const prepared = prepareData(battleScene, turnInfo, attackers);

    if (!prepared) {
        logDuration("SimulatePhase:" + phaseId, "SimulatePhase");
        return storeCache(phaseId, phaseCache, [{
            from: battleScene,
            to: cloneBattlescene(battleScene),
            weight: 1,
        }]);
    }

    const {targets, targetsDef, bonus, groups, groupSizes, totalCount, hasRift} = prepared;
    const result: IBattleSceneTransition[] = [];

    let rollsCount = 0;

    const attackHash = {};

    for (const rollsGrouped of generateRollsGrouped(groupSizes)) {
        const {rolls, map} = rollsUngroup(rollsGrouped);
        const count = permutationsCountGrouped(rollsGrouped);

        let selfDamage = 0;
        let rollWeapons;

        if (hasRift) {
            rollWeapons = map.map((group, idx): IWeapon => {
                const weapon = groups[group][0];

                if (weapon.damage === EWeaponDamageType.pink) {
                    const rift = riftDamage[rolls[idx]];
                    rolls[idx] = rift.roll;
                    selfDamage += (rift.selfDamage || 0);
                    return {
                        type: EWeaponType.gun,
                        damage: rift.damage,
                    };
                } else {
                    return weapon;
                }
            });
        } else {
            rollWeapons = map.map((group): IWeapon => groups[group][0]);
        }

        const rollsHash = rollsHitHash(targetsDef, bonus, rolls, selfDamage);

        if (attackHash[rollsHash]) {
            rollsCount += count;
            attackHash[rollsHash].weight += count;
            continue;
        }

        const baseScene = selfDamage ? riftSelfDamage(battleScene, selfDamage, turnInfo) : battleScene;
        let nextScene = calcAttack(baseScene, turnInfo, rolls, rollWeapons, bonus, targets, targetsDef);

        if (!nextScene) {
            if (selfDamage) {
                nextScene = baseScene;
            } else {
                result.push({
                    from: battleScene,
                    to: cloneBattlescene(battleScene),
                    weight: totalCount - rollsCount,
                });

                break;
            }
        }

        rollsCount += count;

        const transition: IBattleSceneTransition = {
            from: battleScene,
            to: nextScene,
            weight: count,
        };

        attackHash[rollsHash] = transition;

        result.push(transition);
    }

    logDuration("SimulatePhase:" + phaseId, "SimulatePhase");

    return storeCache(phaseId, phaseCache, result);
}

function prepareData(
    battleScene: IBattleScene,
    turnInfo: ITurnInfo,
    attackers: Battleship[],
) {
    const weapons = getWeapons(attackers, turnInfo.turn === 0 ? EWeaponType.missile : EWeaponType.gun)
        .sort((a, b) => b.damage - a.damage);

    if (!weapons.length) {
        return;
    }

    const targets: Battleship[] = shipsByOwner(battleScene.ships, attackers[0].owner, true)
        .filter((ship) => ship.hp > 0)
        .sort((a, b) => b.defence - a.defence);

    const targetsDef = targets.map(({defence}) => defence);

    const bonus = attackers[0].attack;

    const hasRift = weapons.some((weapon) => weapon.damage === EWeaponDamageType.pink);

    const groups = weaponGroups(weapons);
    const groupSizes = groups.map((group) => group.length);

    const totalCount = rollsCountGrouped(groupSizes, 6, false);

    return {targets, targetsDef, bonus, groups, groupSizes, totalCount, hasRift};
}

function storeCache(id: string, phaseCache: IPhaseCache, result: IBattleSceneTransition[]) {
    phaseCache[id] = result;
    return result.map((transition) => Object.assign({}, transition));
}

function fromCache(id: string, phaseCache: IPhaseCache, battleScene: IBattleScene): IBattleSceneTransition[] {
    log(ELogLevel.debug, "SimulatePhase", "from cache", id);

    return phaseCache[id].map((transition: IBattleSceneTransition) => {
        return {...transition, from: battleScene, to: cloneBattlescene(transition.to)};
    });
}

function rollsHitHash(targetsDef: number[], bonus: number, rolls: number[], selfDamage: number): string {
    return [
        ...rolls.map((roll) => countMaxTargets(roll, bonus, targetsDef)),
        selfDamage,
    ].join(",");
}
