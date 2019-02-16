import {expect} from "chai";
import {describe, it} from "mocha";

import {createStore} from "redux";
import {EWeaponDamageType, EWeaponType} from "../../../../src/battle/i-weapon";
import {actionWeaponUpdate} from "../../../../src/ui/components/input-weapon/actions";
import {StateUpdateError} from "../../../../src/ui/lib/state-update-error";
import {reducers} from "../../../../src/ui/reducers";

describe("ui-input-weapon-actions", function () {
    describe("ACTION_WEAPON_UPDATE", function () {
        it("success", function () {
            const store = createStore(reducers, {
                weapons: {
                    "first:0:0": {
                        type: EWeaponType.gun,
                        damage: EWeaponDamageType.yellow,
                        count: 1,
                    },
                },
            });

            store.dispatch(actionWeaponUpdate("first:0:0", {
                type: EWeaponType.missile,
                damage: EWeaponDamageType.orange,
                count: 2,
            }));

            expect(store.getState().weapons["first:0:0"]).to.be.eql({
                type: EWeaponType.missile,
                damage: EWeaponDamageType.orange,
                count: 2,
            });
        });

        it("no such weapon", function () {
            const store = createStore(reducers);

            expect(() => store.dispatch(actionWeaponUpdate("first:0:0", {
                type: EWeaponType.missile,
                damage: EWeaponDamageType.orange,
                count: 2,
            }))).to.throw(StateUpdateError, StateUpdateError.ERROR_WEAPON_NOT_FOUND);
        });
    });
});
