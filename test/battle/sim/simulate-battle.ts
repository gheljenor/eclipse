import {expect} from "chai";
import {describe, it} from "mocha";

import {Battleship, EBattleShipType} from "../../../src/battle/battleship";
import {battleSummary} from "../../../src/battle/select/battle-summary";
import {battleSceneHash} from "../../../src/battle/select/battlescene-hash";
import {IBattleScene} from "../../../src/battle/sim/i-battle-scene";
import {simulateBattle} from "../../../src/battle/sim/simulate-battle";
import {WeaponsHelper} from "../../../src/battle/weapons-helper";
import {showTransition} from "../_tools/show-transition";

describe("simulate-battle", function () {
    it("1 vs 1", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(EBattleShipType.interceptor, "p", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
                new Battleship(EBattleShipType.interceptor, "a", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
            ],
            defender: "a",
        };

        const result = simulateBattle(scene);

        expect(result.transitions.map(showTransition)).to.be.eql([
            "{\"from\":\"a01,p01\",\"to\":\"a01,p01\",\"weight\":1}",
            "{\"from\":\"a01,p01\",\"to\":\"a01,p00\",\"weight\":0.5454545454545455}",
            "{\"from\":\"a01,p01\",\"to\":\"a00,p01\",\"weight\":0.45454545454545453}",
        ]);

        expect(result.scenes.map(battleSceneHash)).to.be.eql([
            "a01,p00",
            "a00,p01",
        ]);

        const summary = battleSummary(result);
        expect(Array.from(summary.scenes).map(([s, v]) => [battleSceneHash(s), v])).to.be.eql([
            ["a01,p00", 0.5454545454545455],
            ["a00,p01", 0.45454545454545453],
        ]);

        expect(summary.results).to.be.eql({
            a: 0.5454545454545455,
            p: 0.45454545454545453,
        });
    });

    it("2 vs 2", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(EBattleShipType.interceptor, "p", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
                new Battleship(EBattleShipType.interceptor, "p", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
                new Battleship(EBattleShipType.interceptor, "a", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
                new Battleship(EBattleShipType.interceptor, "a", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
            ],
            defender: "a",
        };

        const result = simulateBattle(scene);

        expect(result.transitions.map(showTransition)).to.be.eql([
            "{\"from\":\"a01,a01,p01,p01\",\"to\":\"a01,a01,p01,p01\",\"weight\":1}",
            "{\"from\":\"a01,a01,p01,p01\",\"to\":\"a01,a01,p00,p00\",\"weight\":0.05365126676602086}",
            "{\"from\":\"a01,a01,p01,p01\",\"to\":\"a00,a01,p00,p01\",\"weight\":0.08941877794336811}",
            "{\"from\":\"a01,a01,p01,p01\",\"to\":\"a01,a01,p00,p01\",\"weight\":0.44709388971684055}",
            "{\"from\":\"a01,a01,p01,p01\",\"to\":\"a00,a00,p01,p01\",\"weight\":0.03725782414307004}",
            "{\"from\":\"a01,a01,p01,p01\",\"to\":\"a00,a01,p01,p01\",\"weight\":0.3725782414307004}",
            "{\"from\":\"a00,a01,p00,p01\",\"to\":\"a00,a01,p00,p00\",\"weight\":0.5454545454545455}",
            "{\"from\":\"a00,a01,p00,p01\",\"to\":\"a00,a00,p00,p01\",\"weight\":0.45454545454545453}",
            "{\"from\":\"a01,a01,p00,p01\",\"to\":\"a01,a01,p00,p00\",\"weight\":0.7252747252747254}",
            "{\"from\":\"a01,a01,p00,p01\",\"to\":\"a00,a01,p00,p01\",\"weight\":0.27472527472527464}",
            "{\"from\":\"a00,a01,p01,p01\",\"to\":\"a00,a00,p00,p01\",\"weight\":0.06593406593406592}",
            "{\"from\":\"a00,a01,p01,p01\",\"to\":\"a00,a01,p00,p01\",\"weight\":0.32967032967032966}",
            "{\"from\":\"a00,a01,p01,p01\",\"to\":\"a00,a00,p01,p01\",\"weight\":0.6043956043956045}",
        ]);

        expect(result.scenes.map(battleSceneHash)).to.be.eql([
            "a01,a01,p00,p00",
            "a00,a00,p01,p01",
            "a00,a01,p00,p00",
            "a00,a00,p00,p01",
        ]);

        const summary = battleSummary(result);

        expect(Array.from(summary.scenes).map(([s, v]) => [battleSceneHash(s), v])).to.be.eql([
            ["a01,a01,p00,p00", 0.3779171648024108],
            ["a00,a00,p01,p01", 0.26244247555722966],
            ["a00,a01,p00,p00", 0.18276805162051063],
            ["a00,a00,p00,p01", 0.17687230801984896],
        ]);

        expect(summary.results).to.be.eql({
            a: 0.5606852164229215,
            p: 0.43931478357707865,
        });
    });

    it("2x(1xYG+1xYM) vs 1xAncient Cruiser", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(EBattleShipType.interceptor, "p", WeaponsHelper.factory().addYellowGun().addYellowMissile().weapons, 1, 4),
                new Battleship(EBattleShipType.interceptor, "p", WeaponsHelper.factory().addYellowGun().addYellowMissile().weapons, 1, 4),
                new Battleship(EBattleShipType.cruiser, "a", WeaponsHelper.factory().addYellowGun().addYellowGun().weapons, 2, 2, 0, 1),
            ],
            defender: "a",
        };

        const result = simulateBattle(scene);

        expect(result.transitions.map(showTransition)).to.be.eql([
            "{\"from\":\"a12,p01,p01\",\"to\":\"a10,p01,p01\",\"weight\":0.13194444444444445}",
            "{\"from\":\"a12,p01,p01\",\"to\":\"a11,p01,p01\",\"weight\":0.38580246913580246}",
            "{\"from\":\"a12,p01,p01\",\"to\":\"a12,p01,p01\",\"weight\":0.48225308641975306}",
            "{\"from\":\"a11,p01,p01\",\"to\":\"a10,p01,p01\",\"weight\":0.44196428571428575}",
            "{\"from\":\"a11,p01,p01\",\"to\":\"a11,p00,p00\",\"weight\":0.11160714285714285}",
            "{\"from\":\"a11,p01,p01\",\"to\":\"a11,p00,p01\",\"weight\":0.4464285714285714}",
            "{\"from\":\"a12,p01,p01\",\"to\":\"a10,p01,p01\",\"weight\":0.04017857142857143}",
            "{\"from\":\"a12,p01,p01\",\"to\":\"a11,p00,p00\",\"weight\":0.044642857142857144}",
            "{\"from\":\"a12,p01,p01\",\"to\":\"a11,p00,p01\",\"weight\":0.17857142857142858}",
            "{\"from\":\"a12,p01,p01\",\"to\":\"a11,p01,p01\",\"weight\":0.17857142857142858}",
            "{\"from\":\"a12,p01,p01\",\"to\":\"a12,p00,p00\",\"weight\":0.11160714285714285}",
            "{\"from\":\"a12,p01,p01\",\"to\":\"a12,p00,p01\",\"weight\":0.4464285714285714}",
            "{\"from\":\"a11,p00,p01\",\"to\":\"a10,p00,p01\",\"weight\":0.2647058823529412}",
            "{\"from\":\"a11,p00,p01\",\"to\":\"a11,p00,p00\",\"weight\":0.7352941176470589}",
            "{\"from\":\"a12,p00,p01\",\"to\":\"a11,p00,p00\",\"weight\":0.14705882352941177}",
            "{\"from\":\"a12,p00,p01\",\"to\":\"a11,p00,p01\",\"weight\":0.11764705882352941}",
            "{\"from\":\"a12,p00,p01\",\"to\":\"a12,p00,p00\",\"weight\":0.7352941176470589}",
        ]);

        expect(result.scenes.map(battleSceneHash)).to.be.eql([
            "a10,p01,p01",
            "a11,p00,p00",
            "a12,p00,p00",
            "a10,p00,p01",
        ]);

        const summary = battleSummary(result);
        expect(Array.from(summary.scenes).map(([s, v]) => [battleSceneHash(s), v])).to.be.eql([
            ["a10,p01,p01", 0.35989206880668934],
            ["a11,p00,p00", 0.3427145193419143],
            ["a12,p00,p00", 0.21212550413683992],
            ["a10,p00,p01", 0.0852679077145564],
        ]);

        expect(summary.results).to.be.eql({
            a: 0.5548400234787543,
            p: 0.4451599765212457,
        });
    });

    describe("bechmark", function () {
        it("6 vs 6", function () {
            const ts = Date.now();

            const scene: IBattleScene = {
                ships: [
                    new Battleship(EBattleShipType.interceptor, "p", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
                    new Battleship(EBattleShipType.interceptor, "p", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
                    new Battleship(EBattleShipType.interceptor, "p", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
                    new Battleship(EBattleShipType.interceptor, "p", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
                    new Battleship(EBattleShipType.interceptor, "p", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
                    new Battleship(EBattleShipType.interceptor, "p", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),

                    new Battleship(EBattleShipType.interceptor, "a", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
                    new Battleship(EBattleShipType.interceptor, "a", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
                    new Battleship(EBattleShipType.interceptor, "a", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
                    new Battleship(EBattleShipType.interceptor, "a", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
                    new Battleship(EBattleShipType.interceptor, "a", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
                    new Battleship(EBattleShipType.interceptor, "a", WeaponsHelper.factory().addYellowGun().weapons, 1, 3),
                ],
                defender: "a",
            };

            simulateBattle(scene);

            const duration = Date.now() - ts;
            expect(duration).to.be.lte(1000);
        });
    });
});
