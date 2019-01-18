export function rollsCount(count: number, maxValue: number, unique: boolean = true): number {
    if (!unique) {
        return Math.pow(maxValue, count);
    } else {
        return recursiveCalc(maxValue, count);
    }
}

const cache: number[][] = [];

// FIXME: придумать нерекурсивный алгоритм рассчётов
function recursiveCalc(maxValue: number, count: number): number {
    if (count === 0 || maxValue === 0) {
        return 0;
    }

    if (count === 1) {
        return maxValue;
    }

    if (maxValue === 1) {
        return 1;
    }

    const x = count - 1;
    const y = maxValue - 1;

    if (!cache[x]) {
        cache[x] = [];
    }

    if (!cache[x][y]) {
        cache[x][y] = recursiveCalc(maxValue - 1, count) + recursiveCalc(maxValue, count - 1);
    }

    return cache[x][y];
}
