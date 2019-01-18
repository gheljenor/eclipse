import {describe, it} from "mocha";
import {expect} from "chai";

import {memo} from "../../src/lib/memo";

function rand(): number {
    return Math.random();
}

describe("memo", function () {
    it("different arg", function () {
        const m = memo(rand);
        expect(m(1)).not.to.be.eql(m(2));
    });

    it("same arg", function () {
        const m = memo(rand);
        expect(m(1)).to.be.eql(m(1));
    });

    it("doesn't modify original fn", function () {
        function fn(a: number): number {
            return a + 123;
        }

        const m = memo(fn);

        expect(m(1)).to.be.eql(fn(1));
    });
});
