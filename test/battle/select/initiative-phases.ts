import {expect} from "chai";
import {describe, it} from "mocha";

import {BattleShip, BattleShipType} from "../../../src/battle/data/battle-ship";
import {initiativePhases} from "../../../src/battle/select/initiative-phases";
import {IBattleScene} from "../../../src/battle/sim/i-battle-scene";

describe("initiative-phases", function () {
    it("defender first", function () {
        const scene: IBattleScene = {
            ships: [
                new BattleShip(BattleShipType.interceptor, "atk"),
                new BattleShip(BattleShipType.interceptor, "def"),
            ],
            defender: "def",
        };

        expect(initiativePhases(scene)).to.be.eql([[1], [0]]);
    });

    it("more initiative first", function () {
        const scene: IBattleScene = {
            ships: [
                new BattleShip(BattleShipType.interceptor, "atk", [], 1, 3),
                new BattleShip(BattleShipType.interceptor, "def", [], 1, 2),
                new BattleShip(BattleShipType.interceptor, "atk", [], 1, 4),
            ],
            defender: "def",
        };

        expect(initiativePhases(scene)).to.be.eql([[2], [0], [1]]);
    });

    it("defender first", function () {
        const scene: IBattleScene = {
            ships: [
                new BattleShip(BattleShipType.interceptor, "atk", [], 1, 3),
                new BattleShip(BattleShipType.interceptor, "def", [], 1, 4),
                new BattleShip(BattleShipType.interceptor, "atk", [], 1, 4),
            ],
            defender: "def",
        };

        expect(initiativePhases(scene)).to.be.eql([[1], [2], [0]]);
    });

    it("group same ships", function () {
        const scene: IBattleScene = {
            ships: [
                new BattleShip(BattleShipType.interceptor, "atk", [], 1, 3),
                new BattleShip(BattleShipType.interceptor, "atk", [], 1, 3),
                new BattleShip(BattleShipType.interceptor, "def", [], 1, 2),
                new BattleShip(BattleShipType.interceptor, "def", [], 1, 2),
            ],
            defender: "def",
        };

        expect(initiativePhases(scene)).to.be.eql([[0, 1], [2, 3]]);
    });

    it("split different attack", function () {
        const scene: IBattleScene = {
            ships: [
                new BattleShip(BattleShipType.interceptor, "atk", [], 1, 3),
                new BattleShip(BattleShipType.interceptor, "atk", [], 1, 3),
                new BattleShip(BattleShipType.interceptor, "def", [], 1, 2, 0, 1),
                new BattleShip(BattleShipType.interceptor, "def", [], 1, 2, 0, 2),
            ],
            defender: "def",
        };

        expect(initiativePhases(scene)).to.be.eql([[0, 1], [2], [3]]);
    });
});
