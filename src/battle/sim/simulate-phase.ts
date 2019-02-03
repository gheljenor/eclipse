import {ELogLevel, log, logDuration} from "../../lib/logger";
import {generateRollsGrouped} from "../../math/generate-rolls-grouped";
import {permutationsCountGrouped} from "../../math/permutations-count-grouped";
import {rollsCountGrouped} from "../../math/rolls-count-grouped";
import {calcAttack} from "../attack/calc-attack";
import {riftSelfDamage} from "../attack/rift-self-damage";
import {Battleship} from "../battleship";
import {EWeaponDamageType, EWeaponType, IWeapon, riftDamage} from "../i-weapon";
import {battleSceneHash} from "../select/battlescene-hash";
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

    const result: IBattleSceneTransition[] = [];

    const weapons = getWeapons(attackers, turnInfo.turn === 0 ? EWeaponType.missile : EWeaponType.gun)
        .sort((a, b) => b.damage - a.damage);

    if (!weapons.length) {
        logDuration("SimulatePhase:" + phaseId, "SimulatePhase");

        return storeCache(phaseId, phaseCache, [{
            from: battleScene,
            to: cloneBattlescene(battleScene),
            weight: 1,
        }]);
    }

    const targets: Battleship[] = shipsByOwner(battleScene.ships, attackers[0].owner, true)
        .filter((ship) => ship.hp > 0)
        .sort((a, b) => b.defence - a.defence);

    const groups = weaponGroups(weapons);
    const groupSizes = groups.map((group) => group.length);

    let rollsCount = 0;
    const totalCount = rollsCountGrouped(groupSizes, 6, false);

    for (const rollsGrouped of generateRollsGrouped(groupSizes)) {
        let selfDamage = 0;
        const {rolls, map} = rollsUngroup(rollsGrouped);

        const rollWeapons = map.map((group, idx): IWeapon => {
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

        const baseScene = selfDamage ? riftSelfDamage(battleScene, selfDamage, turnInfo.player) : battleScene;
        let nextScene = calcAttack(baseScene, turnInfo, rolls, rollWeapons, attackers[0].attack, targets);

        if (!nextScene) {
            if (selfDamage) {
                nextScene = baseScene;
            } else {
                const transition: IBattleSceneTransition = {
                    from: battleScene,
                    to: cloneBattlescene(battleScene),
                    weight: totalCount - rollsCount,
                };
                result.push(transition);

                break;
            }
        }

        const count = permutationsCountGrouped(rollsGrouped);
        rollsCount += count;

        const finalTransition: IBattleSceneTransition = {
            from: battleScene,
            to: nextScene,
            weight: count,
        };
        result.push(finalTransition);
    }

    logDuration("SimulatePhase:" + phaseId, "SimulatePhase");

    return storeCache(phaseId, phaseCache, result);
}

function storeCache(id: string, phaseCache: IPhaseCache, result: IBattleSceneTransition[]) {
    phaseCache[id] = result;
    return result.map((transition) => Object.assign({}, transition));
}

function fromCache(id: string, phaseCache: IPhaseCache, battleScene: IBattleScene): IBattleSceneTransition[] {
    log(ELogLevel.debug, "SimulatePhase", "from cache", id);

    return phaseCache[id].map((transition: IBattleSceneTransition) => {
        return Object.assign({}, transition, {from: battleScene});
    });
}
