import {expect} from "chai";
import {describe, it} from "mocha";

import {BattleShip, BattleShipType} from "../../../src/battle/data/battle-ship";
import {shipsByPhase} from "../../../src/battle/select/ships-by-phase";

describe("ships-by-phase", function () {
    it("all alive", function () {
        const ships: BattleShip[] = [
            new BattleShip(BattleShipType.interceptor, "player", [], 1),
            new BattleShip(BattleShipType.interceptor, "player", [], 1),
            new BattleShip(BattleShipType.cruiser, "player", [], 1),
        ];

        expect(shipsByPhase(ships, [0, 1])).to.be.eql([
            new BattleShip(BattleShipType.interceptor, "player", [], 1),
            new BattleShip(BattleShipType.interceptor, "player", [], 1),
        ]);
    });

    it("some dead", function () {
        const ships: BattleShip[] = [
            new BattleShip(BattleShipType.interceptor, "player", [], 1),
            new BattleShip(BattleShipType.interceptor, "player", [], 0),
            new BattleShip(BattleShipType.cruiser, "player", [], 1),
        ];

        expect(shipsByPhase(ships, [0, 1])).to.be.eql([
            new BattleShip(BattleShipType.interceptor, "player", [], 1),
        ]);
    });

    it("all dead", function () {
        const ships: BattleShip[] = [
            new BattleShip(BattleShipType.interceptor, "player", [], 0),
            new BattleShip(BattleShipType.interceptor, "player", [], 0),
            new BattleShip(BattleShipType.cruiser, "player", [], 1),
        ];

        expect(shipsByPhase(ships, [0, 1])).to.be.eql([]);
    });
});
