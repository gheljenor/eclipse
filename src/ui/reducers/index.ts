import {combineReducersExtended} from "../lib/combine-reducers-extended";

import {app} from "./app";
import {players} from "./players";
import {ships} from "./ships";
import {summary} from "./summary";
import {weapons} from "./weapons";

export const reducers = combineReducersExtended({
    app,
    players,
    ships,
    weapons,
    summary,
});
