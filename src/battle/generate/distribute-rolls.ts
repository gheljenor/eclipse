import {generateRolls} from "../../math/generate-rolls";

function isMissed(roll: number, bonus: number, defence: number): boolean {
    return roll !== 6 && roll + bonus < 6 + defence;
}

function countMaxTargets(bestRoll: number, bonus: number, targets: number[]): number {
    const count: number = targets.length;

    if (bestRoll === 6) {
        return count;
    }

    for (let i = count - 1; i >= 0; i--) {
        if (isMissed(bestRoll, bonus, targets[i])) {
            return count - i - 1;
        }
    }

    return count;
}

function countMaxHits(rolls: number[], bonus: number, weakestTarget: number): number {
    for (let i = 0; i < rolls.length; i++) {
        if (isMissed(rolls[i], bonus, weakestTarget)) {
            return i;
        }
    }
    return rolls.length;
}

// rolls sorted desc
// targets sorted desc
export function* distributeRolls(rolls: number[], bonus: number, targets: number[]): IterableIterator<number[]> {
    const maxHits = countMaxHits(rolls, bonus, targets[targets.length - 1]);
    const maxTargets = countMaxTargets(rolls[0], bonus, targets);
    const targetOffset = targets.length - maxTargets;

    distribute: for (const dist of generateRolls(maxHits, maxTargets, false)) {
        const distribution: number[] = [];

        for (let i = 0; i < maxHits; i++) {
            const target = dist[i] + targetOffset - 1;

            if (isMissed(rolls[i], bonus, targets[target])) {
                continue distribute;
            }

            distribution.push(target);
        }

        yield distribution;
    }
}
