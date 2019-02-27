import {expect} from "chai";
import {describe, it} from "mocha";

import {BattleShip, BattleShipType} from "../../../src/battle/data/battle-ship";
import {WeaponType} from "../../../src/battle/data/weapon";
import {getWeapons} from "../../../src/battle/select/get-weapons";
import {WeaponsHelper} from "../../../src/battle/data/weapons-helper";

const ships: BattleShip[] = [];

const interceptor = new BattleShip(BattleShipType.interceptor, "player",
    WeaponsHelper.factory().addYellowMissile().addYellowGun().weapons,
);
ships.push(interceptor, interceptor);

describe("get-weapons", function () {
    it("guns", function () {
        expect(getWeapons(ships, WeaponType.gun)).to.be.eql(
            WeaponsHelper.factory().addYellowGun().addYellowGun().weapons,
        );
    });

    it("missiles", function () {
        expect(getWeapons(ships, WeaponType.missile)).to.be.eql(
            WeaponsHelper.factory().addYellowMissile().addYellowMissile().weapons,
        );
    });
});
