import {expect} from "chai";
import {describe, it} from "mocha";

import {createStore} from "redux";
import {actionPlayerUpdate} from "../../../../src/ui/components/player/actions";
import {reducers} from "../../../../src/ui/reducers";

describe("ui-player-actions", function () {
    it("ACTION_PLAYER_UPDATE", function () {
        const store = createStore(reducers, {
            players: {
                first: {name: "Player", ships: []},
                second: {name: "Enemy", ships: []},
                defender: "second",
            },
        });

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
    });
});
