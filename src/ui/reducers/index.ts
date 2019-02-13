import {combineReducers} from "redux";

import {app} from "./app";
import {players} from "./players";
import {ships} from "./ships";
import {State} from "./state";
import {summary, summaryGlobal} from "./summaryGlobal";
import {weapons} from "./weapons";

const baseReducers = combineReducers({
    app,
    players,
    ships,
    weapons,
    summary,
});

export function reducers(state: State, action): State {
    return summaryGlobal(baseReducers(state, action), action);
}
