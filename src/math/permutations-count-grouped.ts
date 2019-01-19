import {permutationsCount} from "./permutations-count";

export function permutationsCountGrouped(combinations: number[][]): number {
    let result: number = 1;
    for (const combination of combinations) {
        result *= permutationsCount(combination);
    }
    return result;
}
