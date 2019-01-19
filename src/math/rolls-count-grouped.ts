import {rollsCount} from "./rolls-count";

export function rollsCountGrouped(groups: number[], maxValue: number = 6, unique: boolean = true): number {
    let result: number = 1;
    for (const group of groups) {
        result *= rollsCount(group, maxValue, unique);
    }
    return result;
}
