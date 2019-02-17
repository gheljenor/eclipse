import {simulate} from "../ui/lib/simulate";
import {State} from "../ui/reducers/state";

import {SIMULATE_WORKER_ERROR, SIMULATE_WORKER_RESULT, SIMULATE_WORKER_SIMULATE} from "./messages";

const ctx: Worker = self as any;

// TODO: make simulate async
// TODO: abort simulation

ctx.addEventListener("message", ({data}) => {
    if (data.type === SIMULATE_WORKER_SIMULATE) {
        runSimulate(data.id, data.state);
    }
});

function runSimulate(id: number, state: State) {
    try {
        const ts = Date.now();
        const result = simulate(state);
        ctx.postMessage({
            id,
            type: SIMULATE_WORKER_RESULT,
            result: {...result, duration: Date.now() - ts},
        });
    } catch (error) {
        ctx.postMessage({type: SIMULATE_WORKER_ERROR, id, error});
    }
}
