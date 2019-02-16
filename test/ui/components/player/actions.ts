import {expect} from "chai";
import {describe, it} from "mocha";

import {createStore} from "redux";
import {actionPlayerUpdate} from "../../../../src/ui/components/player/actions";
import {StateUpdateError} from "../../../../src/ui/lib/state-update-error";
import {reducers} from "../../../../src/ui/reducers";

describe("ui-player-actions", function () {
    describe("ACTION_PLAYER_UPDATE", function () {
        it("success", function () {
            const store = createStore(reducers);

            store.dispatch(actionPlayerUpdate("first", {name: "Player01", defender: true}));

            expect(store.getState().players).to.be.eql({
                first: {name: "Player01", ships: []},
                second: {name: "Enemy", ships: []},
                defender: "first",
            });

            store.dispatch(actionPlayerUpdate("second", {name: "Player02", defender: true}));

            expect(store.getState().players).to.be.eql({
                first: {name: "Player01", ships: []},
                second: {name: "Player02", ships: []},
                defender: "second",
            });

            store.dispatch(actionPlayerUpdate("second", {defender: false}));

            expect(store.getState().players).to.be.eql({
                first: {name: "Player01", ships: []},
                second: {name: "Player02", ships: []},
                defender: "first",
            });
        });

        it("no such player", function () {
            const store = createStore(reducers);
            const state = store.getState();

            expect(() => store.dispatch(actionPlayerUpdate("third", {defender: true})))
                .to.throw(StateUpdateError, StateUpdateError.ERROR_PLAYER_NOT_FOUND);

            expect(store.getState()).to.be.eql(state);
        });
    });
});
