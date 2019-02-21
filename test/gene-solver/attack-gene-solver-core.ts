import {expect} from "chai";
import {describe, it} from "mocha";

import {ancientTactics} from "../../src/battle/attack/ancient-tactics";
import {IWeaponShot} from "../../src/battle/attack/i-weapon-shot";
import {Battleship, EBattleShipType} from "../../src/battle/battleship";
import {BLUE_GUN, ORANGE_GUN, RED_GUN, YELLOW_GUN} from "../../src/battle/weapons-helper";
import {AttackGeneSolverCore} from "../../src/solvers/attack-gene-solver-core";
import {GeneSolver} from "../../src/solvers/gene-solver";

const solverCore = new AttackGeneSolverCore(ancientTactics);
const solver = new GeneSolver(solverCore);

describe("attack-gene-solver-core", function () {
    it("4x1, 1x4", function () {
        this.retries(2);

        const targets = [
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1),
            new Battleship(EBattleShipType.dreadnought, "enemy", [], 4),
        ];

        const result = solver.calculate({
            battleScene: {ships: targets, defender: "player"},
            turnInfo: {turn: 1, player: "player", defender: true, initiative: 0},
            bonus: 1,
            rolls: [6, 5, 5, 5, 5],
            weapons: [RED_GUN, YELLOW_GUN, YELLOW_GUN, YELLOW_GUN, YELLOW_GUN],
            targets,
            targetsDef: targets.map(({defence}) => defence),
        });

        const shots = result.map((shot) => targets.indexOf(shot.target));
        const yellow = shots.slice(1);

        expect(yellow).to.include.members([1, 2, 3, 4]);
        expect(shots[0]).to.be.eql(5);
    });

    it("4x1+1, 1x4", function () {
        this.retries(2);

        const targets = [
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1, 0, 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1, 0, 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1, 0, 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1, 0, 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1, 0, 1),
            new Battleship(EBattleShipType.dreadnought, "enemy", [], 4),
        ];

        const result = solver.calculate({
            battleScene: {ships: targets, defender: "player"},
            turnInfo: {turn: 1, player: "player", defender: true, initiative: 0},
            bonus: 1,
            rolls: [6, 5, 5, 5, 5],
            weapons: [RED_GUN, YELLOW_GUN, YELLOW_GUN, YELLOW_GUN, YELLOW_GUN],
            targets,
            targetsDef: targets.map(({defence}) => defence),
        });

        const shots = result.map((shot) => targets.indexOf(shot.target));
        expect(shots).to.be.eql([4, 5, 5, 5, 5]);
    });

    it("6x1", function () {
        this.retries(2);

        const targets = [
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1),
        ];

        const result = solver.calculate({
            battleScene: {ships: targets, defender: "player"},
            turnInfo: {turn: 1, player: "player", defender: true, initiative: 0},
            bonus: 1,
            rolls: [6, 6, 6, 6, 6, 6],
            weapons: [YELLOW_GUN, YELLOW_GUN, YELLOW_GUN, YELLOW_GUN, YELLOW_GUN, YELLOW_GUN],
            targets,
            targetsDef: targets.map(({defence}) => defence),
        });

        const shots = result.map((shot) => targets.indexOf(shot.target));

        expect(shots).to.have.members([4, 5, 6, 7, 8, 9]);
    });

    it("some complex scene", function () {
        const targets = [
            new Battleship(EBattleShipType.cruiser, "enemy", [], 2, 0, 2),
            new Battleship(EBattleShipType.dreadnought, "enemy", [], 4, 0, 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1),
            new Battleship(EBattleShipType.interceptor, "enemy", [], 1),
        ];

        const result = solver.calculate({
            battleScene: {ships: targets, defender: "player"},
            turnInfo: {turn: 1, player: "player", defender: true, initiative: 0},
            bonus: 1,
            rolls: [6, 6, 6, 6, 6, 6],
            weapons: [YELLOW_GUN, YELLOW_GUN, ORANGE_GUN, ORANGE_GUN, BLUE_GUN, RED_GUN],
            targets,
            targetsDef: targets.map(({defence}) => defence),
        });

        result.forEach((shot: IWeaponShot) => {
            shot.target.hp -= shot.weapon.damage;
        });

        expect(targets.map((target) => Math.max(0, target.hp)))
            .to.be.eql([0, 0, 0, 0, 0]);
    });
});
