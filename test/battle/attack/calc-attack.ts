import {describe, it} from "mocha";
import {expect} from "chai";

import {ITurnInfo} from "../../../src/battle/sim/i-turn-info";
import {IBattleScene} from "../../../src/battle/sim/i-battle-scene";
import {Battleship, EBattleShipType} from "../../../src/battle/battleship";
import {IWeapon} from "../../../src/battle/i-weapon";
import {RED_GUN, YELLOW_GUN} from "../../../src/battle/weapons-helper";
import {calcAttack} from "../../../src/battle/attack/calc-attack";

const turnInfo: ITurnInfo = {
    turn: 1,
    player: "player",
    defender: true,
    initiative: 2
};

const scene: IBattleScene = {
    ships: [
        new Battleship(EBattleShipType.deathmoon, "player", [], 2, 0, 4),
        new Battleship(EBattleShipType.starbase, "player", [], 2, 0, 3),
        new Battleship(EBattleShipType.dreadnought, "player", [], 2, 0, 2),
        new Battleship(EBattleShipType.cruiser, "player", [], 2, 0, 1),
        new Battleship(EBattleShipType.interceptor, "player", [], 2, 0, 0),
    ],
    defender: "player",
};

const weaponsRed: IWeapon[] = [RED_GUN];
const weaponsYellowSingle: IWeapon[] = [YELLOW_GUN];
const weaponsYellowDouble: IWeapon[] = [YELLOW_GUN, YELLOW_GUN];

describe("calc-attack", function () {
    it("miss all", function () {
        const result = calcAttack(scene, turnInfo, [5], weaponsRed, 0, scene.ships);
        expect(result).to.be.null;
    });

    describe("best possible kill", function () {
        it("kill deathmoon", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsRed, 5, scene.ships);
            expect(result.ships[0].hp).to.be.lte(0);

            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("kill starbase", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsRed, 4, scene.ships);
            expect(result.ships[1].hp).to.be.lte(0);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("kill dred", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsRed, 3, scene.ships);
            expect(result.ships[2].hp).to.be.lte(0);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("kill cruiser", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsRed, 2, scene.ships);
            expect(result.ships[3].hp).to.be.lte(0);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("kill interceptor", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsRed, 1, scene.ships);
            expect(result.ships[4].hp).to.be.lte(0);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
        });
    });

    describe("best possible damage", function () {
        it("damage deathmoon", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsYellowSingle, 5, scene.ships);
            expect(result.ships[0].hp).to.be.lte(1);

            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("damage starbase", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsYellowSingle, 4, scene.ships);
            expect(result.ships[1].hp).to.be.lte(1);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("damage dred", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsYellowSingle, 3, scene.ships);
            expect(result.ships[2].hp).to.be.lte(1);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("damage cruiser", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsYellowSingle, 2, scene.ships);
            expect(result.ships[3].hp).to.be.lte(1);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("damage interceptor", function () {
            const result = calcAttack(scene, turnInfo, [5], weaponsYellowSingle, 1, scene.ships);
            expect(result.ships[4].hp).to.be.lte(1);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
        });
    });

    describe("best possible kill, 2 shots", function () {
        it("kill deathmoon", function () {
            const result = calcAttack(scene, turnInfo, [5, 5], weaponsYellowDouble, 5, scene.ships);
            expect(result.ships[0].hp).to.be.lte(0);

            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("kill starbase", function () {
            const result = calcAttack(scene, turnInfo, [5, 5], weaponsYellowDouble, 4, scene.ships);
            expect(result.ships[1].hp).to.be.lte(0);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("kill dred", function () {
            const result = calcAttack(scene, turnInfo, [5, 5], weaponsYellowDouble, 3, scene.ships);
            expect(result.ships[2].hp).to.be.lte(0);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("kill cruiser", function () {
            const result = calcAttack(scene, turnInfo, [5, 5], weaponsYellowDouble, 2, scene.ships);
            expect(result.ships[3].hp).to.be.lte(0);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[4].hp).to.be.equal(2);
        });

        it("kill interceptor", function () {
            const result = calcAttack(scene, turnInfo, [5, 5], weaponsYellowDouble, 1, scene.ships);
            expect(result.ships[4].hp).to.be.lte(0);

            expect(result.ships[0].hp).to.be.equal(2);
            expect(result.ships[1].hp).to.be.equal(2);
            expect(result.ships[2].hp).to.be.equal(2);
            expect(result.ships[3].hp).to.be.equal(2);
        });
    });
});
