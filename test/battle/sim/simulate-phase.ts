import {expect} from "chai";
import {describe, it} from "mocha";

import {Battleship, EBattleShipType} from "../../../src/battle/battleship";
import {battleSceneHash} from "../../../src/battle/select/battlescene-hash";
import {simulatePhase} from "../../../src/battle/sim/simulate-phase";
import {WeaponsHelper} from "../../../src/battle/weapons-helper";

describe("simulate-phase", function () {
    it("gun attack", function () {
        const attacker = new Battleship(
            EBattleShipType.interceptor,
            "player",
            WeaponsHelper.factory().addYellowMissile().addYellowGun().weapons,
            1,
            1, 0, 2);

        const result = simulatePhase({
            ships: [
                attacker,
                new Battleship(EBattleShipType.interceptor, "npc", [], 1, 0, 2),
                new Battleship(EBattleShipType.cruiser, "npc", [], 2, 0, 0),
                new Battleship(EBattleShipType.dreadnought, "npc", [], 1, 0, 1),
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
        const attacker = new Battleship(
            EBattleShipType.interceptor,
            "player",
            WeaponsHelper.factory().addRiftTurrel().weapons,
            2,
            1, 0, 2,
        );

        const result = simulatePhase({
            ships: [
                attacker,
                new Battleship(EBattleShipType.interceptor, "npc", [], 1, 0, 2),
                new Battleship(EBattleShipType.cruiser, "npc", [], 2, 0, 0),
                new Battleship(EBattleShipType.dreadnought, "npc", [], 1, 0, 1),
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
        const riftAttacker = new Battleship(
            EBattleShipType.interceptor,
            "player",
            WeaponsHelper.factory().addRiftCannon().weapons,
            2,
            2, 0, 2,
        );

        const gunAttacker = new Battleship(
            EBattleShipType.cruiser,
            "player",
            WeaponsHelper.factory().addOrangeGun().weapons,
            2,
            1, 1, 1,
        );

        const result = simulatePhase({
            ships: [
                riftAttacker,
                gunAttacker,
                new Battleship(EBattleShipType.interceptor, "npc", [], 1, 0, 2),
                new Battleship(EBattleShipType.cruiser, "npc", [], 2, 0, 0),
                new Battleship(EBattleShipType.dreadnought, "npc", [], 1, 0, 1),
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
        const attacker = new Battleship(
            EBattleShipType.interceptor,
            "player",
            WeaponsHelper.factory().addYellowMissile().addYellowGun().weapons,
            1,
            1, 0, 2);

        const result = simulatePhase({
            ships: [
                attacker,
                new Battleship(EBattleShipType.interceptor, "npc", [], 1, 0, 2),
                new Battleship(EBattleShipType.cruiser, "npc", [], 2, 0, 0),
                new Battleship(EBattleShipType.dreadnought, "npc", [], 1, 0, 1),
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
        const attacker = new Battleship(
            EBattleShipType.interceptor,
            "player",
            WeaponsHelper.factory().addYellowGun().weapons,
            1,
            1, 0, 2);

        const result = simulatePhase({
            ships: [
                attacker,
                new Battleship(EBattleShipType.interceptor, "npc", [], 1, 0, 2),
                new Battleship(EBattleShipType.cruiser, "npc", [], 2, 0, 0),
                new Battleship(EBattleShipType.dreadnought, "npc", [], 1, 0, 1),
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
