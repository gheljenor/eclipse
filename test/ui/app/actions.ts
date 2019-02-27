import {expect} from "chai";
import {describe, it} from "mocha";

import {createStore} from "redux";
import {BattleShipType} from "../../../src/battle/data/battle-ship";
import {
    actionAppAutoSim,
    actionAppSimulate,
    actionAppSimulateFailed,
    actionAppSimulateReady,
} from "../../../src/ui/app/actions";
import {reducers} from "../../../src/ui/reducers";

const summary = {
    results: {first: 0.45454545454545453, second: 0.5454545454545455},
    outcomes: {
        first: [{
            probability: 0.45454545454545453,
            ships: [{count: 1, type: BattleShipType.interceptor}],
        }],
        second: [{
            probability: 0.5454545454545455,
            ships: [{count: 1, type: BattleShipType.interceptor}],
        }],
    },
    duration: 10,
};

describe("ui-app-actions", function () {
    it("ACTION_APP_SIMULATE", function () {
        const store = createStore(reducers, {summary: {...summary, state: "ready"}});

        store.dispatch(actionAppSimulate());

        expect(store.getState().summary).to.be.eql({...summary, state: "pending"});
    });

    it("ACTION_APP_SIMULATE_READY", function () {
        const store = createStore(reducers);

        store.dispatch(actionAppSimulateReady(summary));

        expect(store.getState().summary).to.be.eql({...summary, state: "ready"});
    });

    it("ACTION_APP_SIMULATE_FAILED", function () {
        const store = createStore(reducers, {summary: {...summary, state: "pending"}});

        store.dispatch(actionAppSimulateFailed(Error("some error")));

        expect(store.getState().summary).to.be.eql({...summary, state: "empty"});
    });

    it("ACTION_APP_AUTOSIM", function () {
        const store = createStore(reducers);

        store.dispatch(actionAppAutoSim(true));
        expect(store.getState().app.autosim).to.be.true;

        store.dispatch(actionAppAutoSim(false));
        expect(store.getState().app.autosim).to.be.false;
    });
});
