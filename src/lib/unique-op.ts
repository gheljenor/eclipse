export function uniqueOp<T>(hashFn: (a: T) => string) {
    const cache = Object.create(null);

    return function filterNonUnique(a: T): boolean {
        const hash = hashFn(a);
        if (cache[hash]) {
            return false;
        }
        cache[hash] = true;
        return true;
    };
}
