import {combineReducers} from "redux";
import {combineLinear} from "../lib/combine-linear";

import {app} from "./app";
import {players} from "./players";
import {ships} from "./ships";
import {summary, summaryGlobal} from "./summary";
import {weapons} from "./weapons";

const baseReducers = combineReducers({
    app,
    players,
    ships,
    weapons,
    summary,
});

export const reducers = combineLinear([
    baseReducers,
    summaryGlobal,
]);
