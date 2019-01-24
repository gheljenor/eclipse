import {expect} from "chai";
import {describe, it} from "mocha";

import {Battleship, EBattleShipType} from "../../../src/battle/battleship";
import {initiativePhases} from "../../../src/battle/select/initiative-phases";
import {IBattleScene} from "../../../src/battle/sim/i-battle-scene";

describe("initiative-phases", function () {
    it("defender first", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(EBattleShipType.interceptor, "atk"),
                new Battleship(EBattleShipType.interceptor, "def"),
            ],
            defender: "def",
        };

        expect(initiativePhases(scene)).to.be.eql([[1], [0]]);
    });

    it("more initiative first", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(EBattleShipType.interceptor, "atk", [], 1, 3),
                new Battleship(EBattleShipType.interceptor, "def", [], 1, 2),
                new Battleship(EBattleShipType.interceptor, "atk", [], 1, 4),
            ],
            defender: "def",
        };

        expect(initiativePhases(scene)).to.be.eql([[2], [0], [1]]);
    });

    it("defender first", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(EBattleShipType.interceptor, "atk", [], 1, 3),
                new Battleship(EBattleShipType.interceptor, "def", [], 1, 4),
                new Battleship(EBattleShipType.interceptor, "atk", [], 1, 4),
            ],
            defender: "def",
        };

        expect(initiativePhases(scene)).to.be.eql([[1], [2], [0]]);
    });

    it("group same ships", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(EBattleShipType.interceptor, "atk", [], 1, 3),
                new Battleship(EBattleShipType.interceptor, "atk", [], 1, 3),
                new Battleship(EBattleShipType.interceptor, "def", [], 1, 2),
                new Battleship(EBattleShipType.interceptor, "def", [], 1, 2),
            ],
            defender: "def",
        };

        expect(initiativePhases(scene)).to.be.eql([[0, 1], [2, 3]]);
    });

    it("split different attack", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(EBattleShipType.interceptor, "atk", [], 1, 3),
                new Battleship(EBattleShipType.interceptor, "atk", [], 1, 3),
                new Battleship(EBattleShipType.interceptor, "def", [], 1, 2, 0, 1),
                new Battleship(EBattleShipType.interceptor, "def", [], 1, 2, 0, 2),
            ],
            defender: "def",
        };

        expect(initiativePhases(scene)).to.be.eql([[0, 1], [2], [3]]);
    });
});
