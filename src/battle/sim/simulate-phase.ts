import {IBattleScene, IBattleSceneTransition} from "./i-battle-scene";
import {ITurnInfo} from "./i-turn-info";
import {Battleship} from "../battleship";
import {shipsByOwner} from "../select/ships-by-owner";
import {getWeapons} from "../select/get-weapons";
import {EWeaponType} from "../i-weapon";
import {weaponGroups} from "../select/weapon-groups";
import {generateRollsGrouped} from "../../math/generate-rolls-grouped";
import {rollsUngroup} from "../select/rolls-ungroup";
import {calcAttack} from "../attack/calc-attack";
import {permutationsCountGrouped} from "../../math/permutations-count-grouped";
import {rollsCountGrouped} from "../../math/rolls-count-grouped";
import {cloneBattlescene} from "./clone-battlescene";

export function simulatePhase(battleScene: IBattleScene, turnInfo: ITurnInfo, attackers: Battleship[]): IBattleSceneTransition[] {
    const weapons = getWeapons(attackers, turnInfo.turn === 0 ? EWeaponType.missile : EWeaponType.gun)
        .sort((a, b) => b.damage - a.damage);

    if (!weapons.length) {
        return [{
            from: battleScene,
            to: cloneBattlescene(battleScene),
            weight: 1
        }];
    }

    const result: IBattleSceneTransition[] = [];

    const targets: Battleship[] = shipsByOwner(battleScene.ships, attackers[0].owner, true)
        .sort((a, b) => b.defence - a.defence);

    const groups = weaponGroups(weapons);
    const groupSizes = groups.map((group) => group.length);

    let rollsCount = 0;
    const totalCount = rollsCountGrouped(groupSizes, 6, false);

    for (const rollsGrouped of generateRollsGrouped(groupSizes)) {
        const {rolls, map} = rollsUngroup(rollsGrouped);
        const rollWeapons = map.map((group) => groups[group][0]);

        const nextScene = calcAttack(battleScene, turnInfo, rolls, rollWeapons, attackers[0].attack, targets);

        if (!nextScene) {
            const transition: IBattleSceneTransition = {
                from: battleScene,
                to: cloneBattlescene(battleScene),
                weight: totalCount - rollsCount
            };
            result.push(transition);

            break;
        }

        const count = permutationsCountGrouped(rollsGrouped);
        rollsCount += count;

        const transition: IBattleSceneTransition = {
            from: battleScene,
            to: nextScene,
            weight: count
        };
        result.push(transition);
    }

    return result;
}
