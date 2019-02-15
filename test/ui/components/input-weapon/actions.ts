import {expect} from "chai";
import {describe, it} from "mocha";

import {createStore} from "redux";
import {EWeaponDamageType, EWeaponType} from "../../../../src/battle/i-weapon";
import {actionWeaponUpdate} from "../../../../src/ui/components/input-weapon/actions";
import {reducers} from "../../../../src/ui/reducers";

describe("ui-input-weapon-actions", function () {
    it("ACTION_WEAPON_UPDATE", function () {
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
});
