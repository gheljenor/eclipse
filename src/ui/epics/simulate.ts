import {ofType} from "redux-observable";
import {of} from "rxjs";
import {catchError, map, mergeMap, withLatestFrom} from "rxjs/operators";

import {ACTION_APP_SIMULATE, actionAppSimulateFailed, actionAppSimulateReady} from "../app/actions";

import SimulateWorker from "../../simulate-worker";

const simulateWorker = new SimulateWorker();

export const simulateEpic = (action$, state$) => action$.pipe(
    ofType(ACTION_APP_SIMULATE),
    withLatestFrom(state$),
    mergeMap(([action, state]) => simulateWorker.simulate(state)),
    map(actionAppSimulateReady),
    catchError((error) => of(actionAppSimulateFailed(error as Error))),
);
