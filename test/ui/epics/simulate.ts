import {expect} from "chai";
import {afterEach, describe, it} from "mocha";
import {of} from "rxjs";
import sinon from "sinon";

import SimulateWorker from "../../../src/simulate-worker";
import {actionAppSimulate, actionAppSimulateFailed, actionAppSimulateReady} from "../../../src/ui/app/actions";
import {simulateEpic} from "../../../src/ui/epics/simulate";

describe("simulateEpic", function () {
    afterEach(function () {
        sinon.restore();
    });

    it("success", function (done) {
        const action$ = of(actionAppSimulate());
        const state$ = of({});

        const result = {outcomes: {}, results: {}, duration: 10};
        const stub = sinon.stub(SimulateWorker.prototype, "simulate");
        stub.resolves(result);

        simulateEpic(action$, state$).subscribe((action) => {
            expect(action).to.be.eql(actionAppSimulateReady(result));
            done();
        });
    });

    it("fail", function (done) {
        const action$ = of(actionAppSimulate());
        const state$ = of({});

        const error = Error("some error");
        const stub = sinon.stub(SimulateWorker.prototype, "simulate");
        stub.rejects(error);

        simulateEpic(action$, state$).subscribe((action) => {
            expect(action).to.be.eql(actionAppSimulateFailed(error));
            done();
        });
    });
});
