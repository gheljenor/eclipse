import {expect} from "chai";
import {describe, it} from "mocha";

import {createStore} from "redux";
import {EBattleShipType} from "../../../../src/battle/battleship";
import {EWeaponDamageType, EWeaponType} from "../../../../src/battle/i-weapon";
import {ACTION_SHIP_ADD, actionShipAdd, actionShipRemove} from "../../../../src/ui/components/ship-list/actions";
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

const defaultWeapon = {
    type: EWeaponType.gun,
    damage: EWeaponDamageType.yellow,
    count: 1,
};

describe("ui-ship-list-actions", function () {
    describe("ACTION_SHIP_ADD", function () {
        it("success", function () {
            const store = createStore(reducers);

            store.dispatch(actionShipAdd("first"));

            const firstState = store.getState();

            expect(firstState.ships).to.be.eql({"first:0": defaultShip});

            store.dispatch(actionShipAdd("second"));

            const secondState = store.getState();

            expect(secondState.ships).to.be.eql({"first:0": defaultShip, "second:0": defaultShip});

            expect(secondState.players).to.be.eql({
                first: {name: "Player", ships: ["first:0"]},
                second: {name: "Enemy", ships: ["second:0"]},
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

        it("ship exists", function () {
            const store = createStore(reducers, {ships: {"first:0": defaultShip}});
            const state = store.getState();

            expect(() => store.dispatch({type: ACTION_SHIP_ADD, playerId: "first", shipId: "first:0"}))
                .to.throw(StateUpdateError, StateUpdateError.ERROR_SHIP_COLLISION);

            expect(store.getState()).to.be.eql(state);
        });
    });

    describe("ACTION_SHIP_REMOVE", function () {
        it("success", function () {
            const store = createStore(reducers, {
                players: {
                    first: {name: "Player", ships: ["first:0"]},
                    second: {name: "Enemy", ships: ["second:0"]},
                    defender: "second",
                },
                ships: {
                    "first:0": {
                        ...defaultShip,
                        weapons: ["first:0:1"],
                    },
                    "second:0": defaultShip,
                },
                weapons: {"first:0:0": defaultWeapon},
            });

            store.dispatch(actionShipRemove("first", "first:0"));

            expect(store.getState().players).to.be.eql({
                first: {name: "Player", ships: []},
                second: {name: "Enemy", ships: ["second:0"]},
                defender: "second",
            });

            expect(store.getState().ships).to.be.eql({"second:0": defaultShip});

            store.dispatch(actionShipRemove("second", "second:0"));

            expect(store.getState().players).to.be.eql({
                first: {name: "Player", ships: []},
                second: {name: "Enemy", ships: []},
                defender: "second",
            });

            expect(store.getState().ships).to.be.eql({});
            expect(store.getState().weapons).to.be.eql({});
        });

        it("no such player", function () {
            const store = createStore(reducers, {ships: {"first:0": defaultShip}});
            const state = store.getState();

            expect(() => store.dispatch(actionShipRemove("third", "first:0")))
                .to.throw(StateUpdateError, StateUpdateError.ERROR_PLAYER_NOT_FOUND);

            expect(store.getState()).to.be.eql(state);
        });

        it("no such ship", function () {
            const store = createStore(reducers);
            const state = store.getState();

            expect(() => store.dispatch(actionShipRemove("first", "first:0")))
                .to.throw(StateUpdateError, StateUpdateError.ERROR_SHIP_NOT_FOUND);

            expect(store.getState()).to.be.eql(state);
        });
    });
});
