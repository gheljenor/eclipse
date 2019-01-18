import {describe, it} from "mocha";
import {expect} from "chai";

import {permutationsCount} from "../../src/math/permutations-count";

describe("permutations-count", function () {
    it("[1,1,1,1,1]", function () {
        expect(permutationsCount([1, 1, 1, 1, 1])).to.be.equal(1);
    });

    it("[1,1,1,1,2]", function () {
        expect(permutationsCount([1, 1, 1, 1, 2])).to.be.equal(5);
    });

    it("[1,1,1,2,2]", function () {
        expect(permutationsCount([1, 1, 1, 2, 2])).to.be.equal(10);
    });

    it("[1,1,2,2,2]", function () {
        expect(permutationsCount([1, 1, 2, 2, 2])).to.be.equal(10);
    });

    it("[1,1,2,2,3]", function () {
        expect(permutationsCount([1, 1, 2, 2, 3])).to.be.equal(30);
    });
});
