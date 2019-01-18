export function* generateRolls(count: number, maxValue: number = 6, unique: boolean = true): IterableIterator<number[]> {
    if (count < 1) {
        yield [];
        return;
    }

    for (let i: number = maxValue; i > 0; i--) {
        if (count === 1) {
            yield [i];
        } else {
            for (const rolls of generateRolls(count - 1, unique ? i : maxValue, unique)) {
                yield [i].concat(rolls);
            }
        }
    }
}
