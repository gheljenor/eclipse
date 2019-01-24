import {expect} from "chai";
import {describe, it} from "mocha";
import {makeInvertWay} from "../../../src/battle/select/make-invert-way";
import {cloneBattlescene} from "../../../src/battle/sim/clone-battlescene";
import {IBattleSceneTransition} from "../../../src/battle/sim/i-battle-scene";
import {createScene} from "../_tools/create-scene";

describe("make-invert-way", function () {
    it("1 layer", function () {
        const startScene = createScene([1, 1], [1, 1]);

        const transitions: IBattleSceneTransition[][] = [[{
            from: startScene,
            to: createScene([1, 0], [1, 1]),
            weight: 0.5,
        }, {
            from: startScene,
            to: createScene([1, 1], [1, 0]),
            weight: 0.5,
        }]];

        const way = makeInvertWay(transitions);

        expect(way.get(transitions[0][0].to)).to.be.eql([transitions[0][0]]);
        expect(way.get(transitions[0][1].to)).to.be.eql([transitions[0][1]]);
    });

    it("2 layers", function () {
        const startScene = createScene([1, 1], [1, 1]);

        const subscene1 = createScene([1, 0], [1, 1]);
        const subscene2 = createScene([1, 1], [1, 0]);

        const transitions: IBattleSceneTransition[][] = [[{
            from: startScene,
            to: subscene1,
            weight: 2,
        }, {
            from: startScene,
            to: subscene2,
            weight: 1,
        }], [{
            from: subscene1,
            to: cloneBattlescene(subscene1),
            weight: 1,
        }, {
            from: subscene1,
            to: createScene([0, 0], [1, 1]),
            weight: 2,
        }, {
            from: subscene2,
            to: cloneBattlescene(subscene2),
            weight: 5,
        }, {
            from: subscene2,
            to: createScene([1, 1], [0, 0]),
            weight: 5,
        }]];

        const way = makeInvertWay(transitions);

        expect(way.get(transitions[1][0].to)).to.be.eql([transitions[1][0]]);
        expect(way.get(transitions[1][1].to)).to.be.eql([transitions[1][1]]);
        expect(way.get(transitions[1][2].to)).to.be.eql([transitions[1][2]]);
        expect(way.get(transitions[1][3].to)).to.be.eql([transitions[1][3]]);
    });

    it("2 layers, diamond", function () {
        const startScene = createScene([1, 1], [1, 1]);

        const subscene1 = createScene([1, 0], [1, 1]);
        const subscene2 = createScene([1, 1], [1, 0]);

        const endScene = createScene([1, 0], [1, 0]);

        const transitions: IBattleSceneTransition[][] = [[{
            from: startScene,
            to: subscene1,
            weight: 2,
        }, {
            from: startScene,
            to: subscene2,
            weight: 1,
        }], [{
            from: subscene1,
            to: cloneBattlescene(subscene1),
            weight: 1,
        }, {
            from: subscene1,
            to: endScene,
            weight: 2,
        }, {
            from: subscene2,
            to: cloneBattlescene(subscene2),
            weight: 5,
        }, {
            from: subscene2,
            to: endScene,
            weight: 5,
        }]];

        const way = makeInvertWay(transitions);

        expect(way.get(transitions[1][0].to)).to.be.eql([transitions[1][0]]);
        expect(way.get(transitions[1][1].to)).to.be.eql([transitions[1][1], transitions[1][3]]);
        expect(way.get(transitions[1][2].to)).to.be.eql([transitions[1][2]]);
    });
});
