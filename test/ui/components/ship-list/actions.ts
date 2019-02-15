import {expect} from "chai";
import {describe, it} from "mocha";

import {createStore} from "redux";
import {EBattleShipType} from "../../../../src/battle/battleship";
import {EWeaponDamageType, EWeaponType} from "../../../../src/battle/i-weapon";
import {actionShipAdd, actionShipRemove} from "../../../../src/ui/components/ship-list/actions";
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
    it("ACTION_SHIP_ADD", function () {
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

    it("ACTION_SHIP_REMOVE", function () {
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
});
