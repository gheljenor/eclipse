import {describe, it} from "mocha";
import {expect} from "chai";

import {Battleship, BattleShipType} from "../../../src/battle/battleship";
import {EWeaponType, WeaponsHelper} from "../../../src/battle/i-weapon";
import {getWeapons} from "../../../src/battle/select/get-weapons";

const ships: Battleship[] = [];

const interceptor = new Battleship(BattleShipType.interceptor, "player",
    WeaponsHelper.factory().addYellowMissile().addYellowGun().weapons
);
ships.push(interceptor, interceptor);

describe("get-weapons", function () {
    it("guns", function () {
        expect(getWeapons(ships, EWeaponType.gun)).to.be.eql(
            WeaponsHelper.factory().addYellowGun().addYellowGun().weapons
        );
    });

    it("missiles", function () {
        expect(getWeapons(ships, EWeaponType.missile)).to.be.eql(
            WeaponsHelper.factory().addYellowMissile().addYellowMissile().weapons
        );
    });
});
