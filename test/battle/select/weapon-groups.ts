import {describe, it} from "mocha";
import {expect} from "chai";

import {WeaponsHelper} from "../../../src/battle/IWeapon";
import {weaponGroups} from "../../../src/battle/select/weapon-groups";

describe("weapon-groups", function () {
    it("1 group", function () {
        const weapons = WeaponsHelper.factory().addYellowMissile().weapons;
        expect(weaponGroups(weapons)).to.be.eql([weapons]);
    });

    it("2 groups", function () {
        const weapons = WeaponsHelper.factory().addYellowMissile().addBlueGun().weapons;
        expect(weaponGroups(weapons)).to.be.eql([
            WeaponsHelper.factory().addYellowMissile().weapons,
            WeaponsHelper.factory().addBlueGun().weapons
        ]);
    });

    it("3 groups", function () {
        const weapons = WeaponsHelper.factory()
            .addYellowMissile()
            .addBlueGun()
            .addOrangeGun()
            .weapons;

        expect(weaponGroups(weapons)).to.be.eql([
            WeaponsHelper.factory().addYellowMissile().weapons,
            WeaponsHelper.factory().addBlueGun().weapons,
            WeaponsHelper.factory().addOrangeGun().weapons
        ]);
    });
});
