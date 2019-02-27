import {expect} from "chai";
import {describe, it} from "mocha";

import {BattleShip, BattleShipType} from "../../../src/battle/data/battle-ship";
import {battleSceneHash} from "../../../src/battle/select/battlescene-hash";
import {simulatePhase} from "../../../src/battle/sim/simulate-phase";
import {WeaponsHelper} from "../../../src/battle/data/weapons-helper";

describe("simulate-phase", function () {
    it("gun attack", function () {
        const attacker = new BattleShip(
            BattleShipType.interceptor,
            "player",
            WeaponsHelper.factory().addYellowMissile().addYellowGun().weapons,
            1,
            1, 0, 2);

        const result = simulatePhase({
            ships: [
                attacker,
                new BattleShip(BattleShipType.interceptor, "npc", [], 1, 0, 2),
                new BattleShip(BattleShipType.cruiser, "npc", [], 2, 0, 0),
                new BattleShip(BattleShipType.dreadnought, "npc", [], 1, 0, 1),
            ],
            defender: "player",
        }, {
            initiative: 1,
            defender: true,
            player: "player",
            turn: 1,
        }, [attacker]);

        expect(result.map((transition) => battleSceneHash(transition.to))).to.be.eql([
            "npc01,npc12,npc20,player01",
            "npc01,npc12,npc20,player01",
            "npc01,npc11,npc21,player01",
            "npc01,npc12,npc21,player01",
        ]);
    });

    it("rift attack", function () {
        const attacker = new BattleShip(
            BattleShipType.interceptor,
            "player",
            WeaponsHelper.factory().addRiftTurret().weapons,
            2,
            1, 0, 2,
        );

        const result = simulatePhase({
            ships: [
                attacker,
                new BattleShip(BattleShipType.interceptor, "npc", [], 1, 0, 2),
                new BattleShip(BattleShipType.cruiser, "npc", [], 2, 0, 0),
                new BattleShip(BattleShipType.dreadnought, "npc", [], 1, 0, 1),
            ],
            defender: "player",
        }, {
            initiative: 1,
            defender: true,
            player: "player",
            turn: 1,
        }, [attacker]);

        expect(result.map((transition) => battleSceneHash(transition.to))).to.be.eql([
            "npc01,npc10,npc20,player00",
            "npc01,npc10,npc20,player01",
            "npc01,npc12,npc20,player00",
            "npc01,npc12,npc20,player01",
            "npc01,npc10,npc20,player02",
            "npc01,npc12,npc20,player02",
            "npc01,npc12,npc21,player00",
            "npc01,npc12,npc21,player01",
            "npc01,npc12,npc21,player02",
        ]);
    });

    it("rift attack, and gun attack", function () {
        const riftAttacker = new BattleShip(
            BattleShipType.interceptor,
            "player",
            WeaponsHelper.factory().addRiftCannon().weapons,
            2,
            2, 0, 2,
        );

        const gunAttacker = new BattleShip(
            BattleShipType.cruiser,
            "player",
            WeaponsHelper.factory().addOrangeGun().weapons,
            2,
            1, 1, 1,
        );

        const result = simulatePhase({
            ships: [
                riftAttacker,
                gunAttacker,
                new BattleShip(BattleShipType.interceptor, "npc", [], 1, 0, 2),
                new BattleShip(BattleShipType.cruiser, "npc", [], 2, 0, 0),
                new BattleShip(BattleShipType.dreadnought, "npc", [], 1, 0, 1),
            ],
            defender: "player",
        }, {
            initiative: 1,
            defender: true,
            player: "player",
            turn: 1,
        }, [riftAttacker, gunAttacker]);

        expect(result.map((transition) => battleSceneHash(transition.to))).to.be.eql([
            "npc01,npc10,npc20,player01,player12",
            "npc01,npc10,npc20,player01,player12",
            "npc01,npc10,npc20,player01,player12",
            "npc01,npc12,npc20,player01,player12",
            "npc01,npc10,npc20,player02,player12",
            "npc01,npc10,npc20,player02,player12",
            "npc01,npc10,npc20,player02,player12",
            "npc01,npc12,npc20,player02,player12",
            "npc01,npc10,npc20,player02,player12",
            "npc01,npc12,npc20,player01,player12",
            "npc01,npc10,npc21,player01,player12",
            "npc01,npc12,npc21,player01,player12",
            "npc01,npc12,npc20,player02,player12",
            "npc01,npc10,npc21,player02,player12",
            "npc01,npc12,npc21,player02,player12",
        ]);
    });

    it("missile attack", function () {
        const attacker = new BattleShip(
            BattleShipType.interceptor,
            "player",
            WeaponsHelper.factory().addYellowMissile().addYellowGun().weapons,
            1,
            1, 0, 2);

        const result = simulatePhase({
            ships: [
                attacker,
                new BattleShip(BattleShipType.interceptor, "npc", [], 1, 0, 2),
                new BattleShip(BattleShipType.cruiser, "npc", [], 2, 0, 0),
                new BattleShip(BattleShipType.dreadnought, "npc", [], 1, 0, 1),
            ],
            defender: "player",
        }, {
            initiative: 1,
            defender: true,
            player: "player",
            turn: 0,
        }, [attacker]);

        expect(result.map((transition) => battleSceneHash(transition.to))).to.be.eql([
            "npc00,npc12,npc20,player01",
            "npc00,npc12,npc20,player01",
            "npc01,npc11,npc20,player01",
            "npc01,npc12,npc20,player01",
            "npc01,npc11,npc20,player01",
            "npc01,npc11,npc20,player01",
            "npc01,npc12,npc20,player01",
            "npc01,npc10,npc21,player01",
            "npc01,npc11,npc21,player01",
            "npc01,npc12,npc21,player01",
        ]);
    });

    it("missile attack - no missiles", function () {
        const attacker = new BattleShip(
            BattleShipType.interceptor,
            "player",
            WeaponsHelper.factory().addYellowGun().weapons,
            1,
            1, 0, 2);

        const result = simulatePhase({
            ships: [
                attacker,
                new BattleShip(BattleShipType.interceptor, "npc", [], 1, 0, 2),
                new BattleShip(BattleShipType.cruiser, "npc", [], 2, 0, 0),
                new BattleShip(BattleShipType.dreadnought, "npc", [], 1, 0, 1),
            ],
            defender: "player",
        }, {
            initiative: 1,
            defender: true,
            player: "player",
            turn: 0,
        }, [attacker]);

        expect(result.map((transition) => battleSceneHash(transition.to))).to.be.eql([
            "npc01,npc12,npc21,player01",
        ]);
    });
});
