import {distributeRolls} from "../battle/attack/distribute-rolls";
import {IBattleTactics} from "../battle/attack/i-battle-tactics";
import {IWeaponShot} from "../battle/attack/i-weapon-shot";

export class AttackBruteForceSolver {
    constructor(private tactics: IBattleTactics) {
    }

    public calculate({battleScene, turnInfo, rolls, weapons, bonus, targets, targetsDef}) {
        let maxScore: number;
        let bestShots: IWeaponShot[] = null;

        for (const dist of distributeRolls(rolls, bonus, targetsDef)) {
            if (dist.length === 0) {
                return null;
            }

            const shots: IWeaponShot[] = dist.map((targetIdx, weaponIdx) => ({
                target: targets[targetIdx],
                weapon: weapons[weaponIdx],
            } as IWeaponShot));

            const score = this.tactics(battleScene, turnInfo, shots);

            if (score != null && (maxScore == null || maxScore < score)) {
                maxScore = score;
                bestShots = shots;
            }
        }

        return bestShots;
    }
}
