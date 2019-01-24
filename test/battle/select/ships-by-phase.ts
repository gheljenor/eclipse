import {expect} from "chai";
import {describe, it} from "mocha";

import {Battleship, EBattleShipType} from "../../../src/battle/battleship";
import {shipsByPhase} from "../../../src/battle/select/ships-by-phase";

describe("ships-by-phase", function () {
    it("all alive", function () {
        const ships: Battleship[] = [
            new Battleship(EBattleShipType.interceptor, "player", [], 1),
            new Battleship(EBattleShipType.interceptor, "player", [], 1),
            new Battleship(EBattleShipType.cruiser, "player", [], 1),
        ];

        expect(shipsByPhase(ships, [0, 1])).to.be.eql([
            new Battleship(EBattleShipType.interceptor, "player", [], 1),
            new Battleship(EBattleShipType.interceptor, "player", [], 1),
        ]);
    });

    it("some dead", function () {
        const ships: Battleship[] = [
            new Battleship(EBattleShipType.interceptor, "player", [], 1),
            new Battleship(EBattleShipType.interceptor, "player", [], 0),
            new Battleship(EBattleShipType.cruiser, "player", [], 1),
        ];

        expect(shipsByPhase(ships, [0, 1])).to.be.eql([
            new Battleship(EBattleShipType.interceptor, "player", [], 1),
        ]);
    });

    it("all dead", function () {
        const ships: Battleship[] = [
            new Battleship(EBattleShipType.interceptor, "player", [], 0),
            new Battleship(EBattleShipType.interceptor, "player", [], 0),
            new Battleship(EBattleShipType.cruiser, "player", [], 1),
        ];

        expect(shipsByPhase(ships, [0, 1])).to.be.eql([]);
    });
});
