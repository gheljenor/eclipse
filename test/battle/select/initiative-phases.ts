import {describe, it} from "mocha";
import {expect} from "chai";

import {IBattleScene} from "../../../src/battle/sim/i-battle-scene";
import {Battleship, BattleShipType} from "../../../src/battle/battleship";
import {initiativePhases} from "../../../src/battle/select/initiative-phases";

describe("initiative-phases", function () {
    it("defender first", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(BattleShipType.interceptor, "atk"),
                new Battleship(BattleShipType.interceptor, "def"),
            ],
            defender: "def"
        };

        expect(initiativePhases(scene)).to.be.eql([[1], [0]]);
    });

    it("more initiative first", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(BattleShipType.interceptor, "atk", [], 1, 3),
                new Battleship(BattleShipType.interceptor, "def", [], 1, 2),
                new Battleship(BattleShipType.interceptor, "atk", [], 1, 4),
            ],
            defender: "def"
        };

        expect(initiativePhases(scene)).to.be.eql([[2], [0], [1]]);
    });

    it("defender first", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(BattleShipType.interceptor, "atk", [], 1, 3),
                new Battleship(BattleShipType.interceptor, "def", [], 1, 4),
                new Battleship(BattleShipType.interceptor, "atk", [], 1, 4),
            ],
            defender: "def"
        };

        expect(initiativePhases(scene)).to.be.eql([[1], [2], [0]]);
    });

    it("group same ships", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(BattleShipType.interceptor, "atk", [], 1, 3),
                new Battleship(BattleShipType.interceptor, "atk", [], 1, 3),
                new Battleship(BattleShipType.interceptor, "def", [], 1, 2),
                new Battleship(BattleShipType.interceptor, "def", [], 1, 2),
            ],
            defender: "def"
        };

        expect(initiativePhases(scene)).to.be.eql([[0, 1], [2, 3]]);
    });

    it("split different attack", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(BattleShipType.interceptor, "atk", [], 1, 3),
                new Battleship(BattleShipType.interceptor, "atk", [], 1, 3),
                new Battleship(BattleShipType.interceptor, "def", [], 1, 2, 0, 1),
                new Battleship(BattleShipType.interceptor, "def", [], 1, 2, 0, 2),
            ],
            defender: "def"
        };

        expect(initiativePhases(scene)).to.be.eql([[0, 1], [2], [3]]);
    });
});
