import {expect} from "chai";
import {describe, it} from "mocha";

import {calcAttack} from "../../../src/battle/attack/calc-attack";
import {shipWeights} from "../../../src/battle/attack/default-weights";
import {BattleShip, BattleShipType} from "../../../src/battle/data/battle-ship";
import {redGun, Weapon} from "../../../src/battle/data/weapon";
import {battleSceneHash} from "../../../src/battle/select/battlescene-hash";
import {IBattleScene} from "../../../src/battle/sim/i-battle-scene";
import {ITurnInfo} from "../../../src/battle/sim/i-turn-info";
import {yellowGun} from "../../../src/battle/data/weapon";

const turnInfo: ITurnInfo = {
    turn: 1,
    player: "player",
    defender: true,
    initiative: 2,
};

const scene: IBattleScene = {
    ships: [
        new BattleShip(BattleShipType.deathmoon, "player", [], 2, 0, 4),
        new BattleShip(BattleShipType.starbase, "player", [], 2, 0, 3),
        new BattleShip(BattleShipType.dreadnought, "player", [], 2, 0, 2),
        new BattleShip(BattleShipType.cruiser, "player", [], 2, 0, 1),
        new BattleShip(BattleShipType.interceptor, "player", [], 2, 0, 0),
    ],
    defender: "player",
};

const weaponsRed: Weapon[] = [redGun];
const weaponsYellowSingle: Weapon[] = [yellowGun];
const weaponsYellowDouble: Weapon[] = [yellowGun, yellowGun];

function defs(ships) {
    return ships.map(({defence}) => defence);
}

describe("calc-attack", function () {
    it("miss all", function () {
        const result = calcAttack(scene, turnInfo, [5], weaponsRed, 0, scene.ships, defs(scene.ships));
        expect(result).to.be.null;
    });

    describe("best possible kill", function () {
        it("kill deathmoon", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsRed, 5, scene.ships, defs(scene.ships));
            expect(result.ships[0].hp).to.be.lte(0);

            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("kill starbase", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsRed, 4, scene.ships, defs(scene.ships));
            expect(result.ships[1].hp).to.be.lte(0);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("kill dred", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsRed, 3, scene.ships, defs(scene.ships));
            expect(result.ships[2].hp).to.be.lte(0);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("kill cruiser", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsRed, 2, scene.ships, defs(scene.ships));
            expect(result.ships[3].hp).to.be.lte(0);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("kill interceptor", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsRed, 1, scene.ships, defs(scene.ships));
            expect(result.ships[4].hp).to.be.lte(0);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
        });
    });

    describe("best possible damage", function () {
        it("damage deathmoon", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsYellowSingle, 5, scene.ships, defs(scene.ships));
            expect(result.ships[0].hp).to.be.lte(1);

            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("damage starbase", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsYellowSingle, 4, scene.ships, defs(scene.ships));
            expect(result.ships[1].hp).to.be.lte(1);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("damage dred", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsYellowSingle, 3, scene.ships, defs(scene.ships));
            expect(result.ships[2].hp).to.be.lte(1);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("damage cruiser", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsYellowSingle, 2, scene.ships, defs(scene.ships));
            expect(result.ships[3].hp).to.be.lte(1);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("damage interceptor", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsYellowSingle, 1, scene.ships, defs(scene.ships));
            expect(result.ships[4].hp).to.be.lte(1);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
        });
    });

    describe("best possible kill, 2 shots", function () {
        it("kill deathmoon", function () {
            const result = calcAttack(scene, turnInfo, [5, 5], weaponsYellowDouble, 5, scene.ships, defs(scene.ships));
            expect(result.ships[0].hp).to.be.lte(0);

            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("kill starbase", function () {
            const result = calcAttack(scene, turnInfo, [5, 5], weaponsYellowDouble, 4, scene.ships, defs(scene.ships));
            expect(result.ships[1].hp).to.be.lte(0);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("kill dred", function () {
            const result = calcAttack(scene, turnInfo, [5, 5], weaponsYellowDouble, 3, scene.ships, defs(scene.ships));
            expect(result.ships[2].hp).to.be.lte(0);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("kill cruiser", function () {
            const result = calcAttack(scene, turnInfo, [5, 5], weaponsYellowDouble, 2, scene.ships, defs(scene.ships));
            expect(result.ships[3].hp).to.be.lte(0);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("kill interceptor", function () {
            const result = calcAttack(scene, turnInfo, [5, 5], weaponsYellowDouble, 1, scene.ships, defs(scene.ships));
            expect(result.ships[4].hp).to.be.lte(0);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
        });
    });
});
