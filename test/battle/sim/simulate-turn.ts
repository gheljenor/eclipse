import {expect} from "chai";
import {describe, it} from "mocha";

import {BattleShip, BattleShipType} from "../../../src/battle/data/battle-ship";
import {battleSceneHash} from "../../../src/battle/select/battlescene-hash";
import {IBattleGraphInfo} from "../../../src/battle/select/i-battle-graph-info";
import {initiativePhases} from "../../../src/battle/select/initiative-phases";
import {IBattleScene} from "../../../src/battle/sim/i-battle-scene";
import {simulateTurn} from "../../../src/battle/sim/simulate-turn";
import {WeaponsHelper} from "../../../src/battle/data/weapons-helper";
import {showTransition} from "../_tools/show-transition";

describe("simulate-turn", function () {
    describe("rockets vs guns", function () {
        it("0 turn", function () {
            const scene: IBattleScene = {
                ships: [
                    new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowMissile().weapons, 1, 3, 0, 2),
                    new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowMissile().weapons, 1, 3, 0, 2),
                    new BattleShip(BattleShipType.cruiser, "ancient", WeaponsHelper.factory().addYellowGun().addYellowGun().weapons, 2, 2, 0, 1),
                ],
                defender: "ancient",
            };

            const result: IBattleGraphInfo = simulateTurn(scene, 0);

            expect(result.scenes.map(battleSceneHash)).to.be.eql([
                "ancient10,player01,player01",
                "ancient11,player01,player01",
                "ancient12,player01,player01",
            ]);

            expect(result.scenes[0].winner).to.be.equal("player");

            expect(result.transitions.map(showTransition)).to.be.eql([
                "{\"from\":\"ancient12,player01,player01\",\"to\":\"ancient10,player01,player01\",\"weight\":0.6875}",
                "{\"from\":\"ancient12,player01,player01\",\"to\":\"ancient11,player01,player01\",\"weight\":0.25}",
                "{\"from\":\"ancient12,player01,player01\",\"to\":\"ancient12,player01,player01\",\"weight\":0.0625}",
            ]);
        });

        it("1 turn", function () {
            const scene: IBattleScene = {
                ships: [
                    new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowMissile().weapons, 1, 3, 0, 2),
                    new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowMissile().weapons, 1, 3, 0, 2),
                    new BattleShip(BattleShipType.cruiser, "ancient", WeaponsHelper.factory().addYellowGun().addYellowGun().weapons, 2, 2, 0, 1),
                ],
                defender: "ancient",
            };

            const result: IBattleGraphInfo = simulateTurn(scene, 1);

            expect(result.scenes.map(battleSceneHash)).to.be.eql([
                "ancient12,player00,player00",
                "ancient12,player00,player01",
            ]);

            expect(result.scenes[0].winner).to.be.equal("ancient");

            expect(result.transitions.map(showTransition)).to.be.eql([
                "{\"from\":\"ancient12,player01,player01\",\"to\":\"ancient12,player00,player00\",\"weight\":0.19999999999999998}",
                "{\"from\":\"ancient12,player01,player01\",\"to\":\"ancient12,player00,player01\",\"weight\":0.7999999999999999}",
            ]);
        });
    });

    describe("rockets vs rockets", function () {
        it("0 turn", function () {
            const scene: IBattleScene = {
                ships: [
                    new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowMissile().weapons, 1, 3, 0, 2),
                    new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowMissile().weapons, 1, 3, 0, 2),
                    new BattleShip(BattleShipType.cruiser, "ancient", WeaponsHelper.factory().addOrangeMissile().weapons, 2, 2, 0, 1),
                ],
                defender: "ancient",
            };

            const result: IBattleGraphInfo = simulateTurn(scene, 0);

            expect(result.scenes.map(battleSceneHash)).to.be.eql([
                "ancient10,player01,player01",
                "ancient11,player00,player00",
                "ancient11,player00,player01",
                "ancient11,player01,player01",
                "ancient12,player00,player00",
                "ancient12,player00,player01",
                "ancient12,player01,player01",
            ]);

            expect(result.scenes[0].winner).to.be.equal("player");
            expect(result.scenes[1].winner).to.be.equal("ancient");
            expect(result.scenes[4].winner).to.be.equal("ancient");

            expect(result.transitions.map(showTransition)).to.be.eql([
                "{\"from\":\"ancient12,player01,player01\",\"to\":\"ancient10,player01,player01\",\"weight\":0.6875}",
                "{\"from\":\"ancient12,player01,player01\",\"to\":\"ancient11,player00,player00\",\"weight\":0.027777777777777776}",
                "{\"from\":\"ancient12,player01,player01\",\"to\":\"ancient11,player00,player01\",\"weight\":0.1111111111111111}",
                "{\"from\":\"ancient12,player01,player01\",\"to\":\"ancient11,player01,player01\",\"weight\":0.1111111111111111}",
                "{\"from\":\"ancient12,player01,player01\",\"to\":\"ancient12,player00,player00\",\"weight\":0.006944444444444444}",
                "{\"from\":\"ancient12,player01,player01\",\"to\":\"ancient12,player00,player01\",\"weight\":0.027777777777777776}",
                "{\"from\":\"ancient12,player01,player01\",\"to\":\"ancient12,player01,player01\",\"weight\":0.027777777777777776}",
            ]);
        });

        it("1 turn", function () {
            const scene: IBattleScene = {
                ships: [
                    new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowMissile().weapons, 1, 3, 0, 2),
                    new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowMissile().weapons, 1, 3, 0, 2),
                    new BattleShip(BattleShipType.cruiser, "ancient", WeaponsHelper.factory().addOrangeMissile().weapons, 2, 2, 0, 1),
                ],
                defender: "ancient",
            };

            const result: IBattleGraphInfo = simulateTurn(scene, 1);

            expect(result.scenes.map(battleSceneHash)).to.be.eql([]);
            expect(result.transitions.map(showTransition)).to.be.eql([]);
        });
    });

    describe("guns vs guns", function () {
        it("1 turn", function () {
            const scene: IBattleScene = {
                ships: [
                    new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowGun().weapons, 1, 3, 0, 2),
                    new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowGun().weapons, 1, 3, 0, 2),
                    new BattleShip(BattleShipType.cruiser, "ancient", WeaponsHelper.factory().addOrangeGun().weapons, 2, 2, 0, 1),
                ],
                defender: "ancient",
            };

            const result: IBattleGraphInfo = simulateTurn(scene, 1);

            expect(result.scenes.map(battleSceneHash)).to.be.eql([
                "ancient10,player01,player01",
                "ancient11,player00,player01",
                "ancient11,player01,player01",
                "ancient12,player00,player01",
            ]);

            expect(result.scenes[0].winner).to.be.equal("player");

            expect(result.transitions.map(showTransition)).to.be.eql([
                "{\"from\":\"ancient12,player01,player01\",\"to\":\"ancient10,player01,player01\",\"weight\":0.3}",
                "{\"from\":\"ancient12,player01,player01\",\"to\":\"ancient11,player00,player01\",\"weight\":0.19999999999999998}",
                "{\"from\":\"ancient12,player01,player01\",\"to\":\"ancient11,player01,player01\",\"weight\":0.39999999999999997}",
                "{\"from\":\"ancient12,player01,player01\",\"to\":\"ancient12,player00,player01\",\"weight\":0.1}",
            ]);
        });

        it("2 turn same as 1 turn", function () {
            const scene: IBattleScene = {
                ships: [
                    new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowGun().weapons, 1, 3, 0, 2),
                    new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowGun().weapons, 1, 3, 0, 2),
                    new BattleShip(BattleShipType.cruiser, "ancient", WeaponsHelper.factory().addOrangeGun().weapons, 2, 2, 0, 1),
                ],
                defender: "ancient",
            };

            const first: IBattleGraphInfo = simulateTurn(scene, 1);
            const second: IBattleGraphInfo = simulateTurn(scene, 2);

            expect(first).to.be.eql(second);
        });
    });

    it("healing", function () {
        const scene: IBattleScene = {
            ships: [
                new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowGun().weapons, 1, 3, 0, 2),
                new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowGun().weapons, 1, 3, 0, 2),
                new BattleShip(BattleShipType.cruiser, "ancient", WeaponsHelper.factory().addOrangeGun().weapons, 2, 2, 0, 1, 1),
            ],
            defender: "ancient",
        };

        const result: IBattleGraphInfo = simulateTurn(scene, 1);

        expect(result.scenes.map(battleSceneHash)).to.be.eql([
            "ancient10,player01,player01",
            "ancient12,player00,player01",
        ]);

        expect(result.scenes[0].winner).to.be.equal("player");

        expect(result.transitions.map(showTransition)).to.be.eql([
            "{\"from\":\"ancient12,player01,player01\",\"to\":\"ancient10,player01,player01\",\"weight\":0.49999999999999994}",
            "{\"from\":\"ancient12,player01,player01\",\"to\":\"ancient12,player00,player01\",\"weight\":0.5}",
        ]);
    });

    it("precalc phases", function () {
        const scene: IBattleScene = {
            ships: [
                new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowGun().weapons, 1, 1, 0, 2),
                new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowGun().weapons, 1, 3, 0, 2),
                new BattleShip(BattleShipType.cruiser, "ancient", WeaponsHelper.factory().addOrangeGun().weapons, 2, 2, 0, 1),
            ],
            defender: "ancient",
        };

        const phases = initiativePhases(scene);

        const first: IBattleGraphInfo = simulateTurn(scene, 1, phases);
        const second: IBattleGraphInfo = simulateTurn(scene, 1);

        expect(first).to.be.eql(second);
    });

    it("damaged", function () {
        const scene: IBattleScene = {
            ships: [
                new BattleShip(BattleShipType.interceptor, "p", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
                new BattleShip(BattleShipType.interceptor, "p", WeaponsHelper.factory().addYellowGun().weapons, 0, 3),
                new BattleShip(BattleShipType.interceptor, "a", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
                new BattleShip(BattleShipType.interceptor, "a", WeaponsHelper.factory().addYellowGun().weapons, 0, 3),
            ],
            defender: "a",
        };

        const result = simulateTurn(scene, 1, [[2, 3], [0, 1]]);

        expect(result.transitions.map(showTransition)).to.be.eql([
            "{\"from\":\"a00,a01,p00,p01\",\"to\":\"a00,a01,p00,p00\",\"weight\":0.5454545454545455}",
            "{\"from\":\"a00,a01,p00,p01\",\"to\":\"a00,a00,p00,p01\",\"weight\":0.45454545454545453}",
        ]);
    });
});
