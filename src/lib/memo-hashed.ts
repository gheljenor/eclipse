export function memoHashed<Arg, Res>(fn: (arg: Arg) => Res, hashFn: (arg: Arg) => string) {
    const cache = new Map<string, Res>();

    return function (arg: Arg): Res {
        const hash = hashFn(arg);
        if (!cache.has(hash)) {
            const result = fn.call(this, arg);
            cache.set(hash, result);
            return result;
        }

        return cache.get(hash);
    };
}
