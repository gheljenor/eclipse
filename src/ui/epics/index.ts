import {combineEpics} from "redux-observable";
import {simulateEpic} from "./simulate";

export const epics = combineEpics(
    simulateEpic,
);
