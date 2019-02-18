export function* combineGenerators<T>(...generators: Array<IterableIterator<T>>): IterableIterator<T> {
    while (true) {
        for (const generator of generators) {
            const {value, done} = generator.next();
            if (done) {
                return;
            }
            yield value;
        }
    }
}
