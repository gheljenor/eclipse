import {expect} from "chai";
import {describe, it} from "mocha";

import {createStore} from "redux";
import {BattleShipType} from "../../../../src/battle/data/battle-ship";
import {WeaponDamageType, WeaponType} from "../../../../src/battle/data/weapon";
import {ACTION_SHIP_ADD, actionShipAdd, actionShipRemove} from "../../../../src/ui/components/ship-list/actions";
import {StateUpdateError} from "../../../../src/ui/lib/state-update-error";
import {reducers} from "../../../../src/ui/reducers";

const defaultShip = {
    type: BattleShipType.interceptor,
    count: 1,
    hp: 1,
    attack: 0,
    defence: 0,
    initiative: 0,
    heal: 0,
};

const defaultWeapon = {
    type: WeaponType.gun,
    damage: WeaponDamageType.yellow,
    count: 1,
};

describe("ui-ship-list-actions", function () {
    describe("ACTION_SHIP_ADD", function () {
        it("success", function () {
            const store = createStore(reducers);

            store.dispatch(actionShipAdd("first"));

            const firstState = store.getState();

            expect(firstState.ships).to.be.eql({
                counter: 0,
                list: {
                    0: {...defaultShip, weapons: [0]},
                },
            });

            store.dispatch(actionShipAdd("second"));

            const secondState = store.getState();

            expect(secondState.ships).to.be.eql({
                counter: 1,
                list: {
                    0: {...defaultShip, weapons: [0]},
                    1: {...defaultShip, weapons: [1]},
                },
            });

            expect(secondState.players).to.be.eql({
                first: {name: "Player", ships: [0]},
                second: {name: "Enemy", ships: [1]},
                defender: "second",
            });
        });

        it("no such player", function () {
            const store = createStore(reducers);
            const state = store.getState();

            expect(() => store.dispatch(actionShipAdd("third")))
                .to.throw(StateUpdateError, StateUpdateError.ERROR_PLAYER_NOT_FOUND);

            expect(store.getState()).to.be.eql(state);
        });
    });

    describe("ACTION_SHIP_REMOVE", function () {
        it("success", function () {
            const store = createStore(reducers, {
                players: {
                    first: {name: "Player", ships: [0]},
                    second: {name: "Enemy", ships: [1]},
                    defender: "second",
                },
                ships: {
                    counter: 1,
                    list: {
                        0: {...defaultShip, weapons: [0]},
                        1: {...defaultShip, weapons: [1]},
                    },
                },
                weapons: {counter: 0, list: {0: defaultWeapon, 1: defaultWeapon}},
            });

            store.dispatch(actionShipRemove("first", 0));

            expect(store.getState().players).to.be.eql({
                first: {name: "Player", ships: []},
                second: {name: "Enemy", ships: [1]},
                defender: "second",
            });

            expect(store.getState().ships.list).to.be.eql({1: {...defaultShip, weapons: [1]}});
            expect(store.getState().weapons.list).to.be.eql({1: defaultWeapon});

            store.dispatch(actionShipRemove("second", 1));

            expect(store.getState().players).to.be.eql({
                first: {name: "Player", ships: []},
                second: {name: "Enemy", ships: []},
                defender: "second",
            });

            expect(store.getState().ships.list).to.be.eql({});
            expect(store.getState().weapons.list).to.be.eql({});
        });

        it("no such player", function () {
            const store = createStore(reducers, {ships: {counter: 0, list: {0: defaultShip}}});
            const state = store.getState();

            expect(() => store.dispatch(actionShipRemove("third", 0)))
                .to.throw(StateUpdateError, StateUpdateError.ERROR_PLAYER_NOT_FOUND);

            expect(store.getState()).to.be.eql(state);
        });

        it("no such ship", function () {
            const store = createStore(reducers);
            const state = store.getState();

            expect(() => store.dispatch(actionShipRemove("first", 100)))
                .to.throw(StateUpdateError, StateUpdateError.ERROR_SHIP_NOT_FOUND);

            expect(store.getState()).to.be.eql(state);
        });
    });
});
