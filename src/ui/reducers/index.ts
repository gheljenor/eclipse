import {combineReducers} from "redux";

import {app} from "./app";
import {IState} from "./i-state";
import {players} from "./players";
import {ships} from "./ships";
import {summary, summaryGlobal} from "./summaryGlobal";
import {weapons} from "./weapons";

const baseReducers = combineReducers({
    app,
    players,
    ships,
    weapons,
    summary,
});

export function reducers(state: IState, action) {
    return summaryGlobal(baseReducers(state, action), action);
}
