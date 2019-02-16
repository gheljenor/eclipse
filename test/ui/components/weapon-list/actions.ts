import {expect} from "chai";
import {describe, it} from "mocha";

import {createStore} from "redux";
import {EBattleShipType} from "../../../../src/battle/battleship";
import {EWeaponDamageType, EWeaponType} from "../../../../src/battle/i-weapon";
import {
    ACTION_WEAPON_ADD,
    actionWeaponAdd,
    actionWeaponRemove,
} from "../../../../src/ui/components/weapon-list/actions";
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

describe("ui-weapon-list-actions", function () {
    describe("ACTION_WEAPON_ADD", function () {
        it("success", function () {
            const store = createStore(reducers, {
                ships: {"first:0": defaultShip, "second:0": defaultShip},
            });

            store.dispatch(actionWeaponAdd("first:0"));

            expect(store.getState().ships).to.be.eql({
                "first:0": {
                    ...defaultShip,
                    weapons: ["first:0:0"],
                },
                "second:0": defaultShip,
            });
            expect(store.getState().weapons).to.be.eql({"first:0:0": defaultWeapon});

            store.dispatch(actionWeaponAdd("first:0"));

            expect(store.getState().ships).to.be.eql({
                "first:0": {
                    ...defaultShip,
                    weapons: ["first:0:0", "first:0:1"],
                },
                "second:0": defaultShip,
            });
            expect(store.getState().weapons).to.be.eql({"first:0:0": defaultWeapon, "first:0:1": defaultWeapon});
        });

        it("no such ship", function () {
            const store = createStore(reducers);
            const state = store.getState();

            expect(() => store.dispatch(actionWeaponAdd("first:0")))
                .to.throw(StateUpdateError, StateUpdateError.ERROR_SHIP_NOT_FOUND);

            expect(store.getState()).to.be.eql(state);
        });

        it("weapon exists", function () {
            const store = createStore(reducers, {
                ships: {"first:0": {...defaultShip, weapons: ["first:0:0"]}, "second:0": defaultShip},
                weapons: {"first:0:0": defaultWeapon},
            });
            const state = store.getState();

            expect(() => store.dispatch({type: ACTION_WEAPON_ADD, shipId: "first:0", weaponId: "first:0:0"}))
                .to.throw(StateUpdateError, StateUpdateError.ERROR_WEAPON_COLLISION);

            expect(store.getState()).to.be.eql(state);
        });
    });

    describe("ACTION_WEAPON_REMOVE", function () {
        it("success", function () {
            const store = createStore(reducers, {
                ships: {
                    "first:0": {
                        ...defaultShip,
                        weapons: ["first:0:0"],
                    },
                    "second:0": {
                        ...defaultShip,
                        weapons: ["second:0:0"],
                    },
                },
                weapons: {"first:0:0": defaultWeapon, "second:0:0": defaultWeapon},
            });

            store.dispatch(actionWeaponRemove("first:0", "first:0:0"));

            expect(store.getState().ships).to.be.eql({
                "first:0": defaultShip, "second:0": {...defaultShip, weapons: ["second:0:0"]},
            });
            expect(store.getState().weapons).to.be.eql({"second:0:0": defaultWeapon});

            store.dispatch(actionWeaponRemove("second:0", "second:0:0"));

            expect(store.getState().ships).to.be.eql({"first:0": defaultShip, "second:0": defaultShip});
            expect(store.getState().weapons).to.be.eql({});
        });

        it("no such ship", function () {
            const store = createStore(reducers, {
                weapons: {"first:0:0": defaultWeapon},
            });
            const state = store.getState();

            expect(() => store.dispatch(actionWeaponRemove("first:0", "first:0:0")))
                .to.throw(StateUpdateError, StateUpdateError.ERROR_SHIP_NOT_FOUND);

            expect(store.getState()).to.be.eql(state);
        });

        it("no such weapon", function () {
            const store = createStore(reducers, {
                ships: {"first:0": defaultShip, "second:0": defaultShip},
            });
            const state = store.getState();

            expect(() => store.dispatch(actionWeaponRemove("first:0", "first:0:0")))
                .to.throw(StateUpdateError, StateUpdateError.ERROR_WEAPON_NOT_FOUND);

            expect(store.getState()).to.be.eql(state);
        });
    });
});
