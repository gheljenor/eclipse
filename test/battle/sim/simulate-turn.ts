import {describe, it} from "mocha";
import {expect} from "chai";

import {IBattleScene} from "../../../src/battle/sim/i-battle-scene";
import {Battleship, EBattleShipType} from "../../../src/battle/battleship";
import {WeaponsHelper} from "../../../src/battle/weapons-helper";
import {simulateTurn} from "../../../src/battle/sim/simulate-turn";
import {IBattleGraphInfo} from "../../../src/battle/select/i-battle-graph-info";
import {battleSceneHash} from "../../../src/battle/select/battlescene-hash";
import {showTransition} from "../_tools/show-transition";

describe("simulate-turn", function () {
    describe("rockets vs guns", function () {
        it("0 turn", function () {
            const scene: IBattleScene = {
                ships: [
                    new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowMissile().weapons, 1, 3, 0, 2),
                    new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowMissile().weapons, 1, 3, 0, 2),
                    new Battleship(EBattleShipType.cruiser, "ancient", WeaponsHelper.factory().addYellowGun().addYellowGun().weapons, 2, 2, 0, 1)
                ],
                defender: "ancient"
            };

            const result: IBattleGraphInfo = simulateTurn(scene, 0);

            expect(result.scenes.map(battleSceneHash)).to.be.eql([
                'ancient10,player01,player01',
                'ancient11,player01,player01',
                'ancient12,player01,player01'
            ]);

            expect(result.scenes[0].winner).to.be.equal("player");

            expect(result.transitions.map(showTransition)).to.be.eql([{
                from: 'ancient12,player01,player01',
                to: 'ancient10,player01,player01',
                weight: 0.6875
            }, {
                from: 'ancient12,player01,player01',
                to: 'ancient11,player01,player01',
                weight: 0.25
            }, {
                from: 'ancient12,player01,player01',
                to: 'ancient12,player01,player01',
                weight: 0.0625
            }]);
        });

        it("1 turn", function () {
            const scene: IBattleScene = {
                ships: [
                    new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowMissile().weapons, 1, 3, 0, 2),
                    new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowMissile().weapons, 1, 3, 0, 2),
                    new Battleship(EBattleShipType.cruiser, "ancient", WeaponsHelper.factory().addYellowGun().addYellowGun().weapons, 2, 2, 0, 1)
                ],
                defender: "ancient"
            };

            const result: IBattleGraphInfo = simulateTurn(scene, 1);

            expect(result.scenes.map(battleSceneHash)).to.be.eql([
                'ancient12,player00,player00',
                'ancient12,player00,player01'
            ]);

            expect(result.scenes[0].winner).to.be.equal("ancient");

            expect(result.transitions.map(showTransition)).to.be.eql([{
                from: 'ancient12,player01,player01',
                to: 'ancient12,player00,player00',
                weight: 0.2
            }, {
                from: 'ancient12,player01,player01',
                to: 'ancient12,player00,player01',
                weight: 0.8
            }]);
        });
    });

    describe("rockets vs rockets", function () {
        it("0 turn", function () {
            const scene: IBattleScene = {
                ships: [
                    new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowMissile().weapons, 1, 3, 0, 2),
                    new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowMissile().weapons, 1, 3, 0, 2),
                    new Battleship(EBattleShipType.cruiser, "ancient", WeaponsHelper.factory().addOrangeMissile().weapons, 2, 2, 0, 1)
                ],
                defender: "ancient"
            };

            const result: IBattleGraphInfo = simulateTurn(scene, 0);

            expect(result.scenes.map(battleSceneHash)).to.be.eql([
                "ancient10,player01,player01",
                "ancient11,player00,player00",
                "ancient11,player00,player01",
                "ancient11,player01,player01",
                "ancient12,player00,player00",
                "ancient12,player00,player01",
                "ancient12,player01,player01"
            ]);

            expect(result.scenes[0].winner).to.be.equal("player");
            expect(result.scenes[1].winner).to.be.equal("ancient");
            expect(result.scenes[4].winner).to.be.equal("ancient");

            expect(result.transitions.map(showTransition)).to.be.eql([{
                from: 'ancient12,player01,player01',
                to: 'ancient10,player01,player01',
                weight: 0.6875
            }, {
                from: 'ancient12,player01,player01',
                to: 'ancient11,player00,player00',
                weight: 0.027777777777777776
            }, {
                from: 'ancient12,player01,player01',
                to: 'ancient11,player00,player01',
                weight: 0.1111111111111111
            }, {
                from: 'ancient12,player01,player01',
                to: 'ancient11,player01,player01',
                weight: 0.1111111111111111
            }, {
                from: 'ancient12,player01,player01',
                to: 'ancient12,player00,player00',
                weight: 0.006944444444444444
            }, {
                from: 'ancient12,player01,player01',
                to: 'ancient12,player00,player01',
                weight: 0.027777777777777776
            }, {
                from: 'ancient12,player01,player01',
                to: 'ancient12,player01,player01',
                weight: 0.027777777777777776
            }]);
        });

        it("1 turn", function () {
            const scene: IBattleScene = {
                ships: [
                    new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowMissile().weapons, 1, 3, 0, 2),
                    new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowMissile().weapons, 1, 3, 0, 2),
                    new Battleship(EBattleShipType.cruiser, "ancient", WeaponsHelper.factory().addOrangeMissile().weapons, 2, 2, 0, 1)
                ],
                defender: "ancient"
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
                    new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowGun().weapons, 1, 3, 0, 2),
                    new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowGun().weapons, 1, 3, 0, 2),
                    new Battleship(EBattleShipType.cruiser, "ancient", WeaponsHelper.factory().addOrangeGun().weapons, 2, 2, 0, 1)
                ],
                defender: "ancient"
            };

            const result: IBattleGraphInfo = simulateTurn(scene, 1);

            expect(result.scenes.map(battleSceneHash)).to.be.eql([
                'ancient10,player01,player01',
                'ancient11,player00,player01',
                'ancient11,player01,player01',
                'ancient12,player00,player01'
            ]);

            expect(result.scenes[0].winner).to.be.equal("player");

            expect(result.transitions.map(showTransition)).to.be.eql([{
                from: 'ancient12,player01,player01',
                to: 'ancient10,player01,player01',
                weight: 0.25
            }, {
                from: 'ancient12,player01,player01',
                to: 'ancient11,player00,player01',
                weight: 0.16666666666666666
            }, {
                from: 'ancient12,player01,player01',
                to: 'ancient11,player01,player01',
                weight: 0.3333333333333333
            }, {
                from: 'ancient12,player01,player01',
                to: 'ancient12,player00,player01',
                weight: 0.25
            }]);
        });

        it("2 turn same as 1 turn", function () {
            const scene: IBattleScene = {
                ships: [
                    new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowGun().weapons, 1, 3, 0, 2),
                    new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowGun().weapons, 1, 3, 0, 2),
                    new Battleship(EBattleShipType.cruiser, "ancient", WeaponsHelper.factory().addOrangeGun().weapons, 2, 2, 0, 1)
                ],
                defender: "ancient"
            };

            const first: IBattleGraphInfo = simulateTurn(scene, 1);
            const second: IBattleGraphInfo = simulateTurn(scene, 2);

            expect(first).to.be.eql(second);
        });
    });

    it("healing", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowGun().weapons, 1, 3, 0, 2),
                new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addYellowGun().weapons, 1, 3, 0, 2),
                new Battleship(EBattleShipType.cruiser, "ancient", WeaponsHelper.factory().addOrangeGun().weapons, 2, 2, 0, 1, 1)
            ],
            defender: "ancient"
        };

        const result: IBattleGraphInfo = simulateTurn(scene, 1);

        expect(result.scenes.map(battleSceneHash)).to.be.eql([
            "ancient10,player01,player01",
            "ancient12,player00,player01"
        ]);

        expect(result.scenes[0].winner).to.be.equal("player");

        expect(result.transitions.map(showTransition)).to.be.eql([{
            from: 'ancient12,player01,player01',
            to: 'ancient10,player01,player01',
            weight: 0.3333333333333333
        }, {
            from: 'ancient12,player01,player01',
            to: 'ancient12,player00,player01',
            weight: 0.6666666666666666
        }]);
    });
});
