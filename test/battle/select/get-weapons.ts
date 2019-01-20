import {describe, it} from "mocha";
import {expect} from "chai";

import {Battleship, EBattleShipType} from "../../../src/battle/battleship";
import {EWeaponType} from "../../../src/battle/i-weapon";
import {getWeapons} from "../../../src/battle/select/get-weapons";
import {WeaponsHelper} from "../../../src/battle/weapons-helper";

const ships: Battleship[] = [];

const interceptor = new Battleship(EBattleShipType.interceptor, "player",
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
