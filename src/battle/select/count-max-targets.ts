import {isMissed} from "./is-missed";

export function countMaxTargets(bestRoll: number, bonus: number, targets: number[]): number {
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
