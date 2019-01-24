import {generateRolls} from "./generate-rolls";

export function* generateRollsGrouped(
    groups: number[],
    maxValue: number = 6,
    unique: boolean = true,
): IterableIterator<number[][]> {
    if (groups.length === 0) {
        return [];
    }

    for (const rolls of generateRolls(groups[0], maxValue, unique)) {
        if (groups.length > 1) {
            for (const result of generateRollsGrouped(groups.slice(1), maxValue, unique)) {
                yield [rolls].concat(result);
            }
        } else {
            yield [rolls];
        }
    }
}
