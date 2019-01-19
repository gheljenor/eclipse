import {describe, it} from "mocha";
import {expect} from "chai";

import {Battleship, BattleShipType} from "../../../src/battle/battleship";
import {getWinner} from "../../../src/battle/select/get-winner";

describe("get-winner", function () {
    it("both alive", function () {
        expect(getWinner([
            new Battleship(BattleShipType.interceptor, "first"),
            new Battleship(BattleShipType.interceptor, "second"),
        ])).to.be.equal(null);
    });

    it("both dead", function () {
        expect(getWinner([
            new Battleship(BattleShipType.interceptor, "first", [], 0),
            new Battleship(BattleShipType.interceptor, "second", [], 0),
        ])).to.be.equal(null);
    });

    it("first", function () {
        expect(getWinner([
            new Battleship(BattleShipType.interceptor, "first", [], 1),
            new Battleship(BattleShipType.interceptor, "second", [], 0),
        ])).to.be.equal("first");
    });

    it("second", function () {
        expect(getWinner([
            new Battleship(BattleShipType.interceptor, "first", [], 0),
            new Battleship(BattleShipType.interceptor, "second", [], 1),
        ])).to.be.equal("second");
    });
});
