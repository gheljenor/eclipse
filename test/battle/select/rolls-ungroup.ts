import {describe, it} from "mocha";
import {expect} from "chai";
import {rollsUngroup} from "../../../src/battle/select/rolls-ungroup";

describe("rolls-ungroup", function () {
    it("1 group", function () {
        expect(rollsUngroup([[6, 5]])).to.be.eql({
            rolls: [6, 5],
            map: [0, 0]
        })
    });

    it("2 groups", function () {
        expect(rollsUngroup([[6, 4], [5]])).to.be.eql({
            rolls: [6, 5, 4],
            map: [0, 1, 0]
        })
    });
});
