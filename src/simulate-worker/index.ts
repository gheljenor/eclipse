import Worker from "worker-loader!./worker";

import {Deferred} from "../lib/deferred";
import {SummaryResult} from "../ui/components/summary/component";
import {State} from "../ui/reducers/state";
import {
    SIMULATE_WORKER_ABORT,
    SIMULATE_WORKER_ERROR,
    SIMULATE_WORKER_RESULT,
    SIMULATE_WORKER_SIMULATE,
} from "./messages";

export default class SimulateWorker {
    private counter: number = 0;

    private readonly worker: Worker;
    private readonly deferreds: { [id: number]: Deferred<SummaryResult> } = {};

    constructor() {
        this.worker = new Worker();
        this.worker.addEventListener("message", this.onMessage);
    }

    public simulate(state: State): Promise<SummaryResult> {
        for (const key in this.deferreds) {
            this.deferreds[key].reject(Error("Aborted"));
            this.worker.postMessage({type: SIMULATE_WORKER_ABORT, id: key});
        }

        const id = this.counter++;
        const deferred: Deferred<SummaryResult> = new Deferred();

        this.deferreds[id] = deferred;

        const cleanup = () => delete this.deferreds[id];
        deferred.promise.then(cleanup, cleanup);

        this.worker.postMessage({type: SIMULATE_WORKER_SIMULATE, id, state});

        return deferred.promise;
    }

    private onMessage = ({data}) => {
        const {type} = data;

        if (![SIMULATE_WORKER_RESULT, SIMULATE_WORKER_ERROR].includes(type)) {
            return;
        }

        const {id} = data;
        const deferred = this.deferreds[id];
        if (!deferred) {
            return;
        }

        if (type === SIMULATE_WORKER_RESULT) {
            deferred.resolve(data.result);
        } else {
            deferred.reject(data.error);
        }
    };
}
