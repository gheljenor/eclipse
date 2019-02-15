import {expect} from "chai";
import {describe, it} from "mocha";

import {createStore} from "redux";
import {EBattleShipType} from "../../../../src/battle/battleship";
import {EWeaponDamageType, EWeaponType} from "../../../../src/battle/i-weapon";
import {actionWeaponAdd, actionWeaponRemove} from "../../../../src/ui/components/weapon-list/actions";
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
    it("ACTION_WEAPON_ADD", function () {
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

    it("ACTION_WEAPON_REMOVE", function () {
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
});
