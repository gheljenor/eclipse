import {describe, it} from "mocha";
import {expect} from "chai";
import {createScene} from "../_tools/create-scene";
import {IBattleSceneTransition} from "../../../src/battle/sim/i-battle-scene";
import {normalizeGraph} from "../../../src/battle/optimize/normalize-graph";

describe("normalize-graph", function () {
    it("1 -> 2", function () {
        const startScene = createScene([1, 1], [1, 1]);

        const transitions: IBattleSceneTransition[][] = [[{
            from: startScene,
            to: createScene([1, 0], [1, 1]),
            weight: 3
        }, {
            from: startScene,
            to: createScene([1, 1], [1, 0]),
            weight: 7
        }]];

        expect(normalizeGraph(transitions, startScene)).to.be.eql([<IBattleSceneTransition[]>[{
            from: startScene,
            to: transitions[0][0].to,
            weight: 0.3
        }, {
            from: startScene,
            to: transitions[0][1].to,
            weight: 0.7
        }]]);
    });

    it("2 -> 1", function () {
        const endScene = createScene([1, 0], [1, 0]);

        const transitions: IBattleSceneTransition[][] = [[{
            from: createScene([1, 1], [1, 0]),
            to: endScene,
            weight: 3
        }, {
            from: createScene([1, 0], [1, 1]),
            to: endScene,
            weight: 7
        }]];

        expect(normalizeGraph(transitions, transitions[0][0].from)).to.be.eql([<IBattleSceneTransition[]>[{
            from: transitions[0][0].from,
            to: endScene,
            weight: 1
        }, {
            from: transitions[0][1].from,
            to: endScene,
            weight: 1
        }]]);
    });

    it("1 -> 2 -> 4", function () {
        const startScene = createScene([1, 1], [1, 1]);
        const sub1 = createScene([1, 0], [1, 1]);
        const sub2 = createScene([1, 1], [1, 0]);

        const transitions: IBattleSceneTransition[][] = [[{
            from: startScene,
            to: sub1,
            weight: 3
        }, {
            from: startScene,
            to: sub2,
            weight: 7
        }], [{
            from: sub1,
            to: createScene([1, 0], [1, 1]),
            weight: 3
        }, {
            from: sub1,
            to: createScene([0, 0], [1, 1]),
            weight: 1
        }, {
            from: sub2,
            to: createScene([1, 1], [1, 0]),
            weight: 3
        }, {
            from: sub2,
            to: createScene([1, 1], [0, 0]),
            weight: 3
        }]];

        expect(normalizeGraph(transitions, startScene)).to.be.eql(<IBattleSceneTransition[][]>[[{
            from: transitions[0][0].from,
            to: transitions[0][0].to,
            weight: 0.3
        }, {
            from: transitions[0][0].from,
            to: transitions[0][1].to,
            weight: 0.7
        }], [{
            from: transitions[1][0].from,
            to: transitions[1][0].to,
            weight: 0.75
        }, {
            from: transitions[1][1].from,
            to: transitions[1][1].to,
            weight: 0.25
        }, {
            from: transitions[1][2].from,
            to: transitions[1][2].to,
            weight: 0.5
        }, {
            from: transitions[1][3].from,
            to: transitions[1][3].to,
            weight: 0.5
        }]]);
    });

    it("diamond", function () {
        const startScene = createScene([1, 1], [1, 1]);
        const sub1 = createScene([1, 0], [1, 1]);
        const sub2 = createScene([1, 1], [1, 0]);
        const endScene = createScene([1, 0], [1, 0]);

        const transitions: IBattleSceneTransition[][] = [[{
            from: startScene,
            to: sub1,
            weight: 3
        }, {
            from: startScene,
            to: sub2,
            weight: 7
        }], [{
            from: sub1,
            to: endScene,
            weight: 3
        }, {
            from: sub2,
            to: endScene,
            weight: 1
        }]];

        expect(normalizeGraph(transitions, startScene)).to.be.eql(<IBattleSceneTransition[][]>[[{
            from: transitions[0][0].from,
            to: transitions[0][0].to,
            weight: 0.3
        }, {
            from: transitions[0][0].from,
            to: transitions[0][1].to,
            weight: 0.7
        }], [{
            from: transitions[1][0].from,
            to: transitions[1][0].to,
            weight: 1
        }, {
            from: transitions[1][1].from,
            to: transitions[1][1].to,
            weight: 1
        }]]);
    });
});
