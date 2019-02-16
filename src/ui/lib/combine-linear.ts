type Reducer<T> = (state: T, action) => T;

export function combineLinear<T>(reducers: Array<Reducer<T>>): Reducer<T> {
    return function (state: T, action): T {
        for (const reducer of reducers) {
            state = reducer(state, action);
        }
        return state;
    };
}
