import {expect} from "chai";
import {describe, it} from "mocha";

import {getSceneWeight} from "../../../src/battle/select/get-scene-weight";
import {createScene} from "../_tools/create-scene";

describe("get-scene-weight", function () {
    it("1 layer", function () {
        const startScene = createScene([1, 1], [1, 1]);

        const transitions = [[{
            from: startScene,
            to: createScene([1, 0], [1, 1]),
            weight: 0.4,
        }, {
            from: startScene,
            to: createScene([1, 1], [1, 0]),
            weight: 0.6,
        }]];

        expect(getSceneWeight(transitions, transitions[0][1].to)).to.be.equal(0.6);
    });

    it("2 layers", function () {
        const startScene = createScene([1, 1], [1, 1]);

        const sub1 = createScene([1, 0], [1, 1]);
        const sub2 = createScene([1, 1], [1, 0]);

        const transitions = [[{
            from: startScene,
            to: sub1,
            weight: 0.4,
        }, {
            from: startScene,
            to: sub2,
            weight: 0.6,
        }], [{
            from: sub1,
            to: createScene([0, 0], [1, 1]),
            weight: 0.5,
        }, {
            from: sub1,
            to: createScene([1, 0], [1, 0]),
            weight: 0.5,
        }]];

        expect(getSceneWeight(transitions, transitions[1][1].to)).to.be.equal(0.2);
    });

    it("3 layers with diamond", function () {
        const startScene = createScene([1, 1], [1, 1]);

        const sub1 = createScene([1, 0], [1, 1]);
        const sub2 = createScene([1, 1], [1, 0]);

        const diamond = createScene([1, 0], [1, 0]);

        const transitions = [[{
            from: startScene,
            to: sub1,
            weight: 0.4,
        }, {
            from: startScene,
            to: sub2,
            weight: 0.6,
        }], [{
            from: sub1,
            to: createScene([0, 0], [1, 1]),
            weight: 0.5,
        }, {
            from: sub1,
            to: diamond,
            weight: 0.5,
        }, {
            from: sub2,
            to: createScene([1, 1], [0, 0]),
            weight: 0.3,
        }, {
            from: sub2,
            to: diamond,
            weight: 0.7,
        }], [{
            from: diamond,
            to: createScene([0, 0], [1, 0]),
            weight: 0.5,
        }, {
            from: diamond,
            to: createScene([1, 0], [0, 0]),
            weight: 0.5,
        }]];

        expect(getSceneWeight(transitions, transitions[2][1].to)).to.be.equal(0.31);
    });
});
