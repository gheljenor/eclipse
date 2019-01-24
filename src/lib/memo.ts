export function memo<Arg, Res>(fn: (arg: Arg) => Res) {
    const cache = new Map<Arg, Res>();

    return function (arg: Arg): Res {
        if (!cache.has(arg)) {
            const result = fn.call(this, arg);
            cache.set(arg, result);

        }
        return cache.get(arg);
    };
}
