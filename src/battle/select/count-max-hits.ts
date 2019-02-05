import {isMissed} from "./is-missed";

export function countMaxHits(rolls: number[], bonus: number, weakestTarget: number): number {
    for (let i = 0; i < rolls.length; i++) {
        if (isMissed(rolls[i], bonus, weakestTarget)) {
            return i;
        }
    }
    return rolls.length;
}
