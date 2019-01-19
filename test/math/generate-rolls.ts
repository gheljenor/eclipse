import {describe, it} from "mocha";
import {expect} from "chai";

import {generateRolls} from "../../src/math/generate-rolls";

function gen(count: number, max: number = 6, unique: boolean = true): number[][] {
    const result = [];
    for (const comb of generateRolls(count, max, unique)) {
        result.push(comb);
    }
    return result;
}

describe("generate-rolls", function () {
    describe("unique", function () {
        it("0", function () {
            expect(gen(0)).to.be.eql([[]]);
        });

        it("1", function () {
            expect(gen(1)).to.be.eql([[6], [5], [4], [3], [2], [1]]);
        });

        it("2", function () {
            expect(gen(2)).to.be.eql([
                [6, 6], [6, 5], [6, 4], [6, 3], [6, 2], [6, 1],
                [5, 5], [5, 4], [5, 3], [5, 2], [5, 1],
                [4, 4], [4, 3], [4, 2], [4, 1],
                [3, 3], [3, 2], [3, 1],
                [2, 2], [2, 1],
                [1, 1]
            ]);
        });

        it("3", function () {
            expect(gen(3)).to.be.eql([
                [6, 6, 6], [6, 6, 5], [6, 6, 4], [6, 6, 3], [6, 6, 2], [6, 6, 1],
                [6, 5, 5], [6, 5, 4], [6, 5, 3], [6, 5, 2], [6, 5, 1],
                [6, 4, 4], [6, 4, 3], [6, 4, 2], [6, 4, 1],
                [6, 3, 3], [6, 3, 2], [6, 3, 1],
                [6, 2, 2], [6, 2, 1],
                [6, 1, 1],
                [5, 5, 5], [5, 5, 4], [5, 5, 3], [5, 5, 2], [5, 5, 1],
                [5, 4, 4], [5, 4, 3], [5, 4, 2], [5, 4, 1],
                [5, 3, 3], [5, 3, 2], [5, 3, 1],
                [5, 2, 2], [5, 2, 1],
                [5, 1, 1],
                [4, 4, 4], [4, 4, 3], [4, 4, 2], [4, 4, 1],
                [4, 3, 3], [4, 3, 2], [4, 3, 1],
                [4, 2, 2], [4, 2, 1],
                [4, 1, 1],
                [3, 3, 3], [3, 3, 2], [3, 3, 1],
                [3, 2, 2], [3, 2, 1],
                [3, 1, 1],
                [2, 2, 2], [2, 2, 1],
                [2, 1, 1],
                [1, 1, 1]
            ]);
        });
    });

    describe("nonunique", function () {
        it("0", function () {
            expect(gen(0, 6, false)).to.be.eql([[]]);
        });

        it("1", function () {
            expect(gen(1, 6, false)).to.be.eql([[6], [5], [4], [3], [2], [1]]);
        });

        it("2", function () {
            expect(gen(2, 6, false)).to.be.eql([
                [6, 6], [6, 5], [6, 4], [6, 3], [6, 2], [6, 1],
                [5, 6], [5, 5], [5, 4], [5, 3], [5, 2], [5, 1],
                [4, 6], [4, 5], [4, 4], [4, 3], [4, 2], [4, 1],
                [3, 6], [3, 5], [3, 4], [3, 3], [3, 2], [3, 1],
                [2, 6], [2, 5], [2, 4], [2, 3], [2, 2], [2, 1],
                [1, 6], [1, 5], [1, 4], [1, 3], [1, 2], [1, 1]
            ]);
        });

        it("3", function () {
            expect(gen(3, 6, false)).to.be.eql([
                [6, 6, 6], [6, 6, 5], [6, 6, 4], [6, 6, 3], [6, 6, 2], [6, 6, 1],
                [6, 5, 6], [6, 5, 5], [6, 5, 4], [6, 5, 3], [6, 5, 2], [6, 5, 1],
                [6, 4, 6], [6, 4, 5], [6, 4, 4], [6, 4, 3], [6, 4, 2], [6, 4, 1],
                [6, 3, 6], [6, 3, 5], [6, 3, 4], [6, 3, 3], [6, 3, 2], [6, 3, 1],
                [6, 2, 6], [6, 2, 5], [6, 2, 4], [6, 2, 3], [6, 2, 2], [6, 2, 1],
                [6, 1, 6], [6, 1, 5], [6, 1, 4], [6, 1, 3], [6, 1, 2], [6, 1, 1],
                [5, 6, 6], [5, 6, 5], [5, 6, 4], [5, 6, 3], [5, 6, 2], [5, 6, 1],
                [5, 5, 6], [5, 5, 5], [5, 5, 4], [5, 5, 3], [5, 5, 2], [5, 5, 1],
                [5, 4, 6], [5, 4, 5], [5, 4, 4], [5, 4, 3], [5, 4, 2], [5, 4, 1],
                [5, 3, 6], [5, 3, 5], [5, 3, 4], [5, 3, 3], [5, 3, 2], [5, 3, 1],
                [5, 2, 6], [5, 2, 5], [5, 2, 4], [5, 2, 3], [5, 2, 2], [5, 2, 1],
                [5, 1, 6], [5, 1, 5], [5, 1, 4], [5, 1, 3], [5, 1, 2], [5, 1, 1],
                [4, 6, 6], [4, 6, 5], [4, 6, 4], [4, 6, 3], [4, 6, 2], [4, 6, 1],
                [4, 5, 6], [4, 5, 5], [4, 5, 4], [4, 5, 3], [4, 5, 2], [4, 5, 1],
                [4, 4, 6], [4, 4, 5], [4, 4, 4], [4, 4, 3], [4, 4, 2], [4, 4, 1],
                [4, 3, 6], [4, 3, 5], [4, 3, 4], [4, 3, 3], [4, 3, 2], [4, 3, 1],
                [4, 2, 6], [4, 2, 5], [4, 2, 4], [4, 2, 3], [4, 2, 2], [4, 2, 1],
                [4, 1, 6], [4, 1, 5], [4, 1, 4], [4, 1, 3], [4, 1, 2], [4, 1, 1],
                [3, 6, 6], [3, 6, 5], [3, 6, 4], [3, 6, 3], [3, 6, 2], [3, 6, 1],
                [3, 5, 6], [3, 5, 5], [3, 5, 4], [3, 5, 3], [3, 5, 2], [3, 5, 1],
                [3, 4, 6], [3, 4, 5], [3, 4, 4], [3, 4, 3], [3, 4, 2], [3, 4, 1],
                [3, 3, 6], [3, 3, 5], [3, 3, 4], [3, 3, 3], [3, 3, 2], [3, 3, 1],
                [3, 2, 6], [3, 2, 5], [3, 2, 4], [3, 2, 3], [3, 2, 2], [3, 2, 1],
                [3, 1, 6], [3, 1, 5], [3, 1, 4], [3, 1, 3], [3, 1, 2], [3, 1, 1],
                [2, 6, 6], [2, 6, 5], [2, 6, 4], [2, 6, 3], [2, 6, 2], [2, 6, 1],
                [2, 5, 6], [2, 5, 5], [2, 5, 4], [2, 5, 3], [2, 5, 2], [2, 5, 1],
                [2, 4, 6], [2, 4, 5], [2, 4, 4], [2, 4, 3], [2, 4, 2], [2, 4, 1],
                [2, 3, 6], [2, 3, 5], [2, 3, 4], [2, 3, 3], [2, 3, 2], [2, 3, 1],
                [2, 2, 6], [2, 2, 5], [2, 2, 4], [2, 2, 3], [2, 2, 2], [2, 2, 1],
                [2, 1, 6], [2, 1, 5], [2, 1, 4], [2, 1, 3], [2, 1, 2], [2, 1, 1],
                [1, 6, 6], [1, 6, 5], [1, 6, 4], [1, 6, 3], [1, 6, 2], [1, 6, 1],
                [1, 5, 6], [1, 5, 5], [1, 5, 4], [1, 5, 3], [1, 5, 2], [1, 5, 1],
                [1, 4, 6], [1, 4, 5], [1, 4, 4], [1, 4, 3], [1, 4, 2], [1, 4, 1],
                [1, 3, 6], [1, 3, 5], [1, 3, 4], [1, 3, 3], [1, 3, 2], [1, 3, 1],
                [1, 2, 6], [1, 2, 5], [1, 2, 4], [1, 2, 3], [1, 2, 2], [1, 2, 1],
                [1, 1, 6], [1, 1, 5], [1, 1, 4], [1, 1, 3], [1, 1, 2], [1, 1, 1]
            ]);
        });
    });

    describe("dice size", function () {
        it("4", function () {
            expect(gen(1, 4)).to.be.eql([[4], [3], [2], [1]]);
        });

        it("10", function () {
            expect(gen(1, 10)).to.be.eql([[10], [9], [8], [7], [6], [5], [4], [3], [2], [1]]);
        });
    });
});

