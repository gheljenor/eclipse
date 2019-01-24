import {expect} from "chai";
import {describe, it} from "mocha";

import {rollsCount} from "../../src/math/rolls-count";

describe("rolls-count", function () {
    describe("zero", function () {
        it("count", function () {
            expect(rollsCount(0, 6)).to.be.equal(0);
        });

        it("count", function () {
            expect(rollsCount(5, 0)).to.be.equal(0);
        });
    });

    describe("non-unique", function () {
        it("6 x 1", function () {
            expect(rollsCount(1, 6, false)).to.be.equal(6);
        });

        it("6 x 2", function () {
            expect(rollsCount(2, 6, false)).to.be.equal(36);
        });

        it("6 x 3", function () {
            expect(rollsCount(3, 6, false)).to.be.equal(216);
        });
    });

    describe("unique", function () {
        it("6 x 1", function () {
            expect(rollsCount(1, 6, true)).to.be.equal(6);
        });

        it("6 x 2", function () {
            expect(rollsCount(2, 6, true)).to.be.equal(21);
        });

        it("6 x 3", function () {
            expect(rollsCount(3, 6, true)).to.be.equal(56);
        });
    });
});
