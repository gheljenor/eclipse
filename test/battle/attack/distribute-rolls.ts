import {expect} from "chai";
import {describe, it} from "mocha";

import {distributeRolls} from "../../../src/battle/attack/distribute-rolls";

function gen(rolls, bonus, targets) {
    const result = [];
    for (const dist of distributeRolls(rolls, bonus, targets)) {
        result.push(dist);
    }
    return result;
}

describe("distribute-rolls", function () {
    it("6, +0, 0", function () {
        expect(gen([6], 0, [0])).to.be.eql([[0]]);
    });

    it("5, +1, 0", function () {
        expect(gen([5], 1, [0])).to.be.eql([[0]]);
    });

    it("6, +0, 1", function () {
        expect(gen([6], 0, [1])).to.be.eql([[0]]);
    });

    it("6, +0, 0,0", function () {
        expect(gen([6], 0, [0, 0])).to.be.eql([[1], [0]]);
    });

    it("6, +0, 1,1", function () {
        expect(gen([6], 0, [0, 0])).to.be.eql([[1], [0]]);
    });

    it("5, +1, 2,1,0", function () {
        expect(gen([5], 1, [2, 1, 0])).to.be.eql([[2]]);
    });

    it("6,5,4, +1, 1,1", function () {
        const res = gen([6, 5, 4], 1, [1, 1]);
        expect(res).to.be.eql([[1], [0]]);
    });

    it("6,5,4, +1, 1,0", function () {
        const res = gen([6, 5, 4], 1, [1, 0]);
        expect(res).to.be.eql([[1, 1], [0, 1]]);
    });

    it("6,5,4, +1, 0,0", function () {
        const res = gen([6, 5, 4], 1, [0, 0]);
        expect(res).to.be.eql([[1, 1], [1, 0], [0, 1], [0, 0]]);
    });

    it("6,5,5,4, +1, 1,1", function () {
        const res = gen([6, 5, 5, 4], 1, [1, 1]);
        expect(res).to.be.eql([[1], [0]]);
    });

    it("6,5,5,4, +1, 1,0", function () {
        const res = gen([6, 5, 5, 4], 1, [1, 0]);
        expect(res).to.be.eql([[1, 1, 1], [0, 1, 1]]);
    });

    it("6,5,5,4, +1, 0,0", function () {
        const res = gen([6, 5, 5, 4], 1, [0, 0]);
        expect(res).to.be.eql([
            [1, 1, 1],
            [1, 1, 0],
            [1, 0, 1],
            [1, 0, 0],
            [0, 1, 1],
            [0, 1, 0],
            [0, 0, 1],
            [0, 0, 0],
        ]);
    });

    it("5,5,4, +1, 0,0", function () {
        const res = gen([5, 5, 4], 1, [0, 0]);
        expect(res).to.be.eql([[1, 1], [1, 0], [0, 1], [0, 0]]);
    });
});
