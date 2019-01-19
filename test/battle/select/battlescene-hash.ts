import {describe, it} from "mocha";
import {expect} from "chai";

import {IBattleScene} from "../../../src/battle/sim/i-battle-scene";
import {Battleship, BattleShipType} from "../../../src/battle/battleship";
import {battleSceneHash} from "../../../src/battle/select/battlescene-hash";

describe("battlescene-hash", function () {
    it("hash it right", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(BattleShipType.interceptor, "first", [], 2),
                new Battleship(BattleShipType.interceptor, "first", [], 1),
                new Battleship(BattleShipType.dreadnought, "second", [], 4),
                new Battleship(BattleShipType.dreadnought, "second", [], 4),
                new Battleship(BattleShipType.cruiser, "first", [], 3),
                new Battleship(BattleShipType.cruiser, "first", [], 3),
                new Battleship(BattleShipType.cruiser, "first", [], 2),
                new Battleship(BattleShipType.deathmoon, "second", [], 2),
                new Battleship(BattleShipType.deathmoon, "first", [], 2),
                new Battleship(BattleShipType.starbase, "first", [], 0),
            ],
            defender: "first"
        };

        expect(battleSceneHash(scene)).to.be.equal("first01,first02,first12,first13,first13,first30,first42,second24,second24,second42");
    });
});
