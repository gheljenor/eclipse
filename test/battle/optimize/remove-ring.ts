import {describe, it} from "mocha";
import {expect} from "chai";
import {createScene} from "../_tools/create-scene";
import {IBattleSceneTransition} from "../../../src/battle/sim/i-battle-scene";

describe("remove-ring", function () {
    it("no ring", function () {
        const start = createScene([1, 1], [1, 1]);

        const side = createScene([1, 0], [1, 1]);

        const noRingStart = createScene([1, 1], [1, 0]);
        const noRingEnd = createScene([1, 0], [1, 0]);

        const graph: IBattleSceneTransition[] = [{
            from: start,
            to: side,
            weight: 0.5
        }, {
            from: start,
            to: noRingStart,
            weight: 0.5
        }, {
            from: side,
            to: noRingEnd,
            weight: 0.5
        }, {
            from: side,
            to: createScene([0, 0], [1, 1]),
            weight: 0.5
        }, {
            from: noRingStart,
            to: noRingEnd,
            weight: 0.5
        }, {
            from: noRingStart,
            to: createScene([1, 1], [0, 0]),
            weight: 0.5
        }];
    });
});
