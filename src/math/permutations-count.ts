import {factorial} from "./factorial";

const cache = new Map<string, number>();

export function permutationsCount(combination: number[]): number {
    const key = combination.join(",");
    if (cache.has(key)) {
        return cache.get(key);
    }

    const groups: { [key: number]: number } = Object.create(null);

    for (const roll of combination) {
        if (!groups[roll]) {
            groups[roll] = 0;
        }
        groups[roll]++;
    }

    let result = factorial(combination.length);

    for (const group in groups) {
        result /= factorial(groups[group]);
    }

    cache.set(key, result);
    return result;
}
