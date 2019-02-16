import {expect} from "chai";
import {describe, it} from "mocha";

import {createStore} from "redux";
import {EBattleShipType} from "../../../../src/battle/battleship";
import {actionShipUpdate} from "../../../../src/ui/components/ship/actions";
import {StateUpdateError} from "../../../../src/ui/lib/state-update-error";
import {reducers} from "../../../../src/ui/reducers";

const defaultShip = {
    type: EBattleShipType.interceptor,
    count: 1,
    hp: 1,
    attack: 0,
    defence: 0,
    initiative: 0,
    heal: 0,
    weapons: [],
};

describe("ui-ship-actions", function () {
    describe("ACTION_SHIP_UPDATE", function () {
        it("success", function () {
            const store = createStore(reducers, {ships: {counter: 0, list: {0: defaultShip}}});

            store.dispatch(actionShipUpdate(0, {attack: 2, defence: 3}));

            expect(store.getState().ships.list[0]).to.be.eql({
                type: EBattleShipType.interceptor,
                count: 1,
                hp: 1,
                attack: 2,
                defence: 3,
                initiative: 0,
                heal: 0,
                weapons: [],
            });

            store.dispatch(actionShipUpdate(0, {
                type: EBattleShipType.cruiser,
                count: 2,
                hp: 3,
                attack: 4,
                defence: 5,
                initiative: 6,
                heal: 7,
            }));

            expect(store.getState().ships.list[0]).to.be.eql({
                type: EBattleShipType.cruiser,
                count: 2,
                hp: 3,
                attack: 4,
                defence: 5,
                initiative: 6,
                heal: 7,
                weapons: [],
            });
        });

        it("no such ship", function () {
            const store = createStore(reducers);
            const state = store.getState();

            expect(() => store.dispatch(actionShipUpdate(0, {})))
                .to.throw(StateUpdateError, StateUpdateError.ERROR_SHIP_NOT_FOUND);

            expect(store.getState()).to.be.eql(state);
        });
    });
});
