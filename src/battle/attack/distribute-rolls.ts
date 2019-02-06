import {generateRolls} from "../../math/generate-rolls";
import {countMaxHits} from "../select/count-max-hits";
import {countMaxTargets} from "../select/count-max-targets";
import {isMissed} from "../select/is-missed";

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
