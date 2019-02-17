export class Deferred<T> {
    public readonly promise: Promise<T>;
    public readonly resolve: (result: T) => void;
    public readonly reject: (error: any) => void;

    constructor() {
        let _resolve;
        let _reject;

        this.promise = new Promise((resolve, reject) => {
            _resolve = resolve;
            _reject = reject;
        });

        this.resolve = _resolve;
        this.reject = _reject;
    }
}
