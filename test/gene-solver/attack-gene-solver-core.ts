import {expect} from "chai";
import {describe, it} from "mocha";

import {ancientTactics} from "../../src/battle/attack/ancient-tactics";
import {Battleship, EBattleShipType} from "../../src/battle/battleship";
import {RED_GUN, YELLOW_GUN} from "../../src/battle/weapons-helper";
import {AttackGeneSolverCore} from "../../src/solvers/attack-gene-solver-core";
import {GeneSolver} from "../../src/solvers/gene-solver";

const solverCore = new AttackGeneSolverCore(ancientTactics);
const solver = new GeneSolver(solverCore);

describe("attack-gene-solver-core", function () {
    it("4x1, 1x4", function () {
        const targets = [
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
        });

        const shots = result.map((shot) => targets.indexOf(shot.target));
        const yellow = shots.slice(1);

        expect(yellow.sort()).to.be.eql([0, 1, 2, 3]);
        expect(shots[0]).to.be.eql(4);
    });

    it("4x1+1, 1x4", function () {
        const targets = [
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
        });

        const shots = result.map((shot) => targets.indexOf(shot.target));
        const yellow = shots.slice(1);

        expect(yellow).to.be.eql([4, 4, 4, 4]);
        expect(shots[0]).to.be.lt(4);
    });

    it("6x1", function () {
        const targets = [
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
        });

        const shots = result.map((shot) => targets.indexOf(shot.target));

        expect(shots.sort()).to.be.eql([0, 1, 2, 3, 4, 5]);
    });
});
