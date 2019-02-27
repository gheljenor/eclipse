import {storiesOf} from "@storybook/react";
import * as React from "react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {BattleShipType} from "../../../battle/data/battle-ship";
import {reducers} from "../../reducers";
import {logger} from "../../stories/logger";
import {SummaryResult} from "./component";
import {SummaryContainer} from "./index";

const example1: SummaryResult = {
    results: {first: 0.7, second: 0.3},
    outcomes: {
        first: [
            {probability: 0.5, ships: [{type: BattleShipType.interceptor, count: 2}]},
            {probability: 0.2, ships: [{type: BattleShipType.interceptor, count: 1}]},
        ],
        second: [
            {probability: 0.3, ships: [{type: BattleShipType.interceptor, count: 1}]},
        ],
    },
    duration: 1,
};

storiesOf("Summary", module)
    .add("example 1", () => {
        const store = createStore(reducers, {summary: example1}, logger());
        return (
            <Provider store={store}>
                <SummaryContainer />
            </Provider>
        );
    });
