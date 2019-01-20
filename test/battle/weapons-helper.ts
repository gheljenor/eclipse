import {describe, it} from "mocha";
import {expect} from "chai";

import {
    WeaponsHelper,
    YELLOW_GUN, YELLOW_MISSILE,
    ORANGE_GUN, ORANGE_MISSILE,
    BLUE_GUN,
    RED_GUN, RED_MISSILE,
    PINK_GUN,
} from "../../src/battle/weapons-helper";

const tests = {
    "addYellowGun": [YELLOW_GUN],
    "addYellowGunTurrel": [YELLOW_GUN, YELLOW_GUN],
    "addYellowMissile": [YELLOW_MISSILE, YELLOW_MISSILE],
    "addYellowMissileTurrel": [YELLOW_MISSILE, YELLOW_MISSILE, YELLOW_MISSILE],
    "addOrangeGun": [ORANGE_GUN],
    "addOrangeMissile": [ORANGE_MISSILE, ORANGE_MISSILE],
    "addBlueGun": [BLUE_GUN],
    "addBlueGunTurrel": [BLUE_GUN, BLUE_GUN],
    "addRedGun": [RED_GUN],
    "addRedMissile": [RED_MISSILE],
    "addRiftCannon": [PINK_GUN],
    "addRiftTurrel": [PINK_GUN, PINK_GUN],
};

describe("weapons-helper", function () {
    for (const method in tests) {
        it(method, function () {
            expect(WeaponsHelper.factory()[method]().weapons).to.be.eql(tests[method]);
        });
    }
});
