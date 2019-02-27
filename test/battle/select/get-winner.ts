import {expect} from "chai";
import {describe, it} from "mocha";

import {BattleShip, BattleShipType} from "../../../src/battle/data/battle-ship";
import {getWinner} from "../../../src/battle/select/get-winner";

describe("get-winner", function () {
    it("both alive", function () {
        expect(getWinner([
            new BattleShip(BattleShipType.interceptor, "first"),
            new BattleShip(BattleShipType.interceptor, "second"),
        ])).to.be.equal(null);
    });

    it("both dead", function () {
        expect(getWinner([
            new BattleShip(BattleShipType.interceptor, "first", [], 0),
            new BattleShip(BattleShipType.interceptor, "second", [], 0),
        ])).to.be.equal(true);
    });

    it("first", function () {
        expect(getWinner([
            new BattleShip(BattleShipType.interceptor, "first", [], 1),
            new BattleShip(BattleShipType.interceptor, "second", [], 0),
        ])).to.be.equal("first");
    });

    it("second", function () {
        expect(getWinner([
            new BattleShip(BattleShipType.interceptor, "first", [], 0),
            new BattleShip(BattleShipType.interceptor, "second", [], 1),
        ])).to.be.equal("second");
    });
});
