import {expect} from "chai";
import {describe, it} from "mocha";

import {createStore} from "redux";
import {BattleShipType} from "../../../../src/battle/data/battle-ship";
import {WeaponDamageType, WeaponType} from "../../../../src/battle/data/weapon";
import {
    ACTION_WEAPON_ADD,
    actionWeaponAdd,
    actionWeaponRemove,
} from "../../../../src/ui/components/weapon-list/actions";
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
    weapons: [],
};

const defaultWeapon = {
    type: WeaponType.gun,
    damage: WeaponDamageType.yellow,
    count: 1,
};

describe("ui-weapon-list-actions", function () {
    describe("ACTION_WEAPON_ADD", function () {
        it("success", function () {
            const store = createStore(reducers, {
                ships: {counter: 1, list: {0: defaultShip, 1: defaultShip}},
            });

            store.dispatch(actionWeaponAdd(0));

            expect(store.getState().ships.list).to.be.eql({
                0: {...defaultShip, weapons: [0]},
                1: defaultShip,
            });
            expect(store.getState().weapons).to.be.eql({counter: 0, list: {0: defaultWeapon}});

            store.dispatch(actionWeaponAdd(0));

            expect(store.getState().ships.list).to.be.eql({
                0: {...defaultShip, weapons: [0, 1]},
                1: defaultShip,
            });
            expect(store.getState().weapons).to.be.eql({counter: 1, list: {0: defaultWeapon, 1: defaultWeapon}});
        });

        it("no such ship", function () {
            const store = createStore(reducers);
            const state = store.getState();

            expect(() => store.dispatch(actionWeaponAdd(100)))
                .to.throw(StateUpdateError, StateUpdateError.ERROR_SHIP_NOT_FOUND);

            expect(store.getState()).to.be.eql(state);
        });
    });

    describe("ACTION_WEAPON_REMOVE", function () {
        it("success", function () {
            const store = createStore(reducers, {
                ships: {
                    counter: 1,
                    list: {
                        0: {...defaultShip, weapons: [0]},
                        1: {...defaultShip, weapons: [1]},
                    },
                },
                weapons: {counter: 1, list: {0: defaultWeapon, 1: defaultWeapon}},
            });

            store.dispatch(actionWeaponRemove(0, 0));

            expect(store.getState().ships.list).to.be.eql({
                0: defaultShip, 1: {...defaultShip, weapons: [1]},
            });
            expect(store.getState().weapons.list).to.be.eql({1: defaultWeapon});

            store.dispatch(actionWeaponRemove(1, 1));

            expect(store.getState().ships.list).to.be.eql({0: defaultShip, 1: defaultShip});
            expect(store.getState().weapons.list).to.be.eql({});
        });

        it("no such ship", function () {
            const store = createStore(reducers, {
                weapons: {counter: 0, list: {0: defaultWeapon}},
            });
            const state = store.getState();

            expect(() => store.dispatch(actionWeaponRemove(100, 0)))
                .to.throw(StateUpdateError, StateUpdateError.ERROR_SHIP_NOT_FOUND);

            expect(store.getState()).to.be.eql(state);
        });

        it("no such weapon", function () {
            const store = createStore(reducers, {
                ships: {counter: 0, list: {0: defaultShip, 1: defaultShip}},
            });
            const state = store.getState();

            expect(() => store.dispatch(actionWeaponRemove(0, 100)))
                .to.throw(StateUpdateError, StateUpdateError.ERROR_WEAPON_NOT_FOUND);

            expect(store.getState()).to.be.eql(state);
        });
    });
});
