import {describe, it} from "mocha";
import {expect} from "chai";

import {rollsCountGrouped} from "../../src/math/rolls-count-grouped";

describe("rolls-count-grouped", function () {
    describe("unique", function () {
        it("2", function () {
            expect(rollsCountGrouped([2], 6, true)).to.be.equal(21);
        });

        it("2, 1", function () {
            expect(rollsCountGrouped([2, 1], 6, true)).to.be.equal(126);
        });
    });

    describe("non-unique", function () {
        it("2", function () {
            expect(rollsCountGrouped([2], 6, false)).to.be.equal(36);
        });

        it("2, 1", function () {
            expect(rollsCountGrouped([2, 1], 6, false)).to.be.equal(216);
        });
    });

    describe("default params", function () {
        it("2, 1", function () {
            expect(rollsCountGrouped([2, 1])).to.be.equal(126);
        });
    });
});
