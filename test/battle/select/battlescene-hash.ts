import {expect} from "chai";
import {describe, it} from "mocha";

import {BattleShip, BattleShipType} from "../../../src/battle/data/battle-ship";
import {battleSceneHash} from "../../../src/battle/select/battlescene-hash";
import {IBattleScene} from "../../../src/battle/sim/i-battle-scene";

describe("battlescene-hash", function () {
    it("hash it right", function () {
        const scene: IBattleScene = {
            ships: [
                new BattleShip(BattleShipType.interceptor, "first", [], 2),
                new BattleShip(BattleShipType.interceptor, "first", [], 1),
                new BattleShip(BattleShipType.dreadnought, "second", [], 4),
                new BattleShip(BattleShipType.dreadnought, "second", [], 4),
                new BattleShip(BattleShipType.cruiser, "first", [], 3),
                new BattleShip(BattleShipType.cruiser, "first", [], 3),
                new BattleShip(BattleShipType.cruiser, "first", [], 2),
                new BattleShip(BattleShipType.deathmoon, "second", [], 2),
                new BattleShip(BattleShipType.deathmoon, "first", [], 2),
                new BattleShip(BattleShipType.starbase, "first", [], 0),
            ],
            defender: "first",
        };

        expect(battleSceneHash(scene)).to.be.equal("first01,first02,first12,first13,first13,first30,first42,second24,second24,second42");
    });
});
