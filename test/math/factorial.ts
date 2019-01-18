import {describe, it} from "mocha";
import {expect} from "chai";
import {factorial} from "../../src/math/factorial";

describe("factorial", function () {
    it("0! = 1", function () {
        expect(factorial(0)).to.be.equal(1);
    });

    it("1! = 1", function () {
        expect(factorial(1)).to.be.equal(1);
    });

    it("2! = 2", function () {
        expect(factorial(2)).to.be.equal(2);
    });

    it("5! = 120", function () {
        expect(factorial(5)).to.be.equal(120);
    });
});
