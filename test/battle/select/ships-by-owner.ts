import {expect} from "chai";
import {describe, it} from "mocha";

import {Battleship, EBattleShipType} from "../../../src/battle/battleship";
import {shipsByOwner} from "../../../src/battle/select/ships-by-owner";

const ships: Battleship[] = [];

const player1Int = new Battleship(EBattleShipType.interceptor, "first");
const player1Cruis = new Battleship(EBattleShipType.cruiser, "first");

const player2Int = new Battleship(EBattleShipType.interceptor, "second");

ships.push(player1Int, player1Int, player1Cruis, player2Int, player2Int);

describe("ships-by-owner", function () {
    describe("include", function () {
        it("first", function () {
            expect(shipsByOwner(ships, "first")).to.be.eql([player1Int, player1Int, player1Cruis]);
        });

        it("second", function () {
            expect(shipsByOwner(ships, "second")).to.be.eql([player2Int, player2Int]);
        });
    });

    describe("exclude", function () {
        it("first", function () {
            expect(shipsByOwner(ships, "first", true)).to.be.eql([player2Int, player2Int]);
        });

        it("second", function () {
            expect(shipsByOwner(ships, "second", true)).to.be.eql([player1Int, player1Int, player1Cruis]);
        });
    });
});
