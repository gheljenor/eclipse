import {expect} from "chai";
import {describe, it} from "mocha";

import {permutationsCountGrouped} from "../../src/math/permutations-count-grouped";

describe("permutations-count-grouped", function () {
    it("[[1,1,1],[1,1]]", function () {
        expect(permutationsCountGrouped([[1, 1, 1], [1, 1]])).to.be.equal(1);
    });

    it("[[1,1,1],[1,2]]", function () {
        expect(permutationsCountGrouped([[1, 1, 1], [1, 2]])).to.be.equal(2);
    });

    it("[[1,1,1],[2,2]]", function () {
        expect(permutationsCountGrouped([[1, 1, 1], [2, 2]])).to.be.equal(1);
    });

    it("[[1,1,2],[2,2]]", function () {
        expect(permutationsCountGrouped([[1, 1, 2], [2, 2]])).to.be.equal(3);
    });

    it("[[1,1,2],[2,3]]", function () {
        expect(permutationsCountGrouped([[1, 1, 2], [2, 3]])).to.be.equal(6);
    });
});
