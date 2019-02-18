import {expect} from "chai";
import {describe, it} from "mocha";
import {Deferred} from "../../src/lib/deferred";

describe("Deferred", function () {
    it("resolve", function (done) {
        this.timeout(100);

        const deferred = new Deferred();

        deferred.resolve(true);

        deferred.promise.then((result) => {
            expect(result).to.be.true;
        }).then(done, done);
    });

    it("reject", function (done) {
        this.timeout(100);

        const deferred = new Deferred();

        const error = new Error("some error");
        deferred.reject(error);

        deferred.promise.catch((result) => {
            expect(result).to.be.eql(error);
        }).then(done, done);
    });
});
