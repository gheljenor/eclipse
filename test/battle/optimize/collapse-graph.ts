import {describe, it} from "mocha";
import {expect} from "chai";

import {cloneBattlescene, IBattleSceneTransition} from "../../../src/battle/sim/i-battle-scene";
import {IBattleGraphInfo} from "../../../src/battle/select/i-battle-graph-info";
import {collapseGraph} from "../../../src/battle/optimize/collapse-graph";
import {createScene} from "../_tools/create-scene";

describe("collapse-graph", function () {
    it("1 layer, missiles", function () {
        const startScene = createScene([1, 1], [1, 1]);

        const transitions: IBattleSceneTransition[][] = [[{
            from: startScene,
            to: createScene([1, 0], [1, 1]),
            weight: 1
        }, {
            from: startScene,
            to: createScene([1, 1], [1, 0]),
            weight: 1
        }, {
            from: startScene,
            to: cloneBattlescene(startScene),
            weight: 1
        }]];

        const result = collapseGraph(transitions, startScene, false);

        expect(result).to.be.eql({
            scenes: [
                transitions[0][0].to,
                transitions[0][1].to,
                transitions[0][2].to,
            ],
            transitions: [{
                from: transitions[0][0].from,
                to: transitions[0][0].to,
                weight: 1 / 3
            }, {
                from: transitions[0][1].from,
                to: transitions[0][1].to,
                weight: 1 / 3
            }, {
                from: transitions[0][2].from,
                to: transitions[0][2].to,
                weight: 1 / 3
            }]
        });
    });

    it("1 layer, guns", function () {
        const startScene = createScene([1, 1], [1, 1]);

        const transitions: IBattleSceneTransition[][] = [[{
            from: startScene,
            to: createScene([1, 0], [1, 1]),
            weight: 1
        }, {
            from: startScene,
            to: createScene([1, 1], [1, 0]),
            weight: 1
        }, {
            from: startScene,
            to: cloneBattlescene(startScene),
            weight: 1
        }]];

        const result = collapseGraph(transitions, startScene, true);

        expect(result).to.be.eql({
            scenes: [
                transitions[0][0].to,
                transitions[0][1].to,
            ],
            transitions: [{
                from: transitions[0][0].from,
                to: transitions[0][0].to,
                weight: 1 / 2
            }, {
                from: transitions[0][1].from,
                to: transitions[0][1].to,
                weight: 1 / 2
            }]
        });
    });

    it("2 layers, no intesections", function () {
        const startScene = createScene([1, 1], [1, 1]);

        const subscene1 = createScene([1, 0], [1, 1]);
        const subscene2 = createScene([1, 1], [1, 0]);

        const transitions: IBattleSceneTransition[][] = [[{
            from: startScene,
            to: subscene1,
            weight: 2
        }, {
            from: startScene,
            to: subscene2,
            weight: 1
        }], [{
            from: subscene1,
            to: cloneBattlescene(subscene1),
            weight: 1
        }, {
            from: subscene1,
            to: createScene([0, 0], [1, 1]),
            weight: 2
        }, {
            from: subscene2,
            to: cloneBattlescene(subscene2),
            weight: 5
        }, {
            from: subscene2,
            to: createScene([1, 1], [0, 0]),
            weight: 5
        }]];

        const result = collapseGraph(transitions, startScene);

        expect(result).to.be.eql(<IBattleGraphInfo>{
            scenes: [
                transitions[1][0].to,
                transitions[1][1].to,
                transitions[1][2].to,
                transitions[1][3].to,
            ],
            transitions: [{
                from: startScene,
                to: transitions[1][0].to,
                weight: 2 / 9
            }, {
                from: startScene,
                to: transitions[1][1].to,
                weight: 4 / 9
            }, {
                from: startScene,
                to: transitions[1][2].to,
                weight: 1 / 6
            }, {
                from: startScene,
                to: transitions[1][3].to,
                weight: 1 / 6
            }]
        })
    });


    it("2 layers, diamond", function () {
        const startScene = createScene([1, 1], [1, 1]);

        const subscene1 = createScene([1, 0], [1, 1]);
        const subscene2 = createScene([1, 1], [1, 0]);

        const endScene = createScene([1, 0], [1, 0]);

        const transitions: IBattleSceneTransition[][] = [[{
            from: startScene,
            to: subscene1,
            weight: 2
        }, {
            from: startScene,
            to: subscene2,
            weight: 1
        }], [{
            from: subscene1,
            to: cloneBattlescene(subscene1),
            weight: 1
        }, {
            from: subscene1,
            to: endScene,
            weight: 2
        }, {
            from: subscene2,
            to: cloneBattlescene(subscene2),
            weight: 5
        }, {
            from: subscene2,
            to: endScene,
            weight: 5
        }]];

        const result = collapseGraph(transitions, startScene);

        expect(result).to.be.eql(<IBattleGraphInfo>{
            scenes: [
                transitions[1][0].to,
                transitions[1][1].to,
                transitions[1][2].to,
            ],
            transitions: [{
                from: startScene,
                to: transitions[1][0].to,
                weight: 2 / 9
            }, {
                from: startScene,
                to: transitions[1][1].to,
                weight: 0.611111111111111
            }, {
                from: startScene,
                to: transitions[1][2].to,
                weight: 1 / 6
            }]
        })
    });

    it("3 layers, diamond", function () {
        const startScene = createScene([1, 1], [1, 1]);

        const subscene1 = createScene([1, 0], [1, 1]);
        const subscene2 = createScene([1, 1], [1, 0]);

        const subscene11 = cloneBattlescene(subscene1);
        const subscene22 = cloneBattlescene(subscene2);

        const diamond = createScene([1, 0], [1, 0]);
        const dead = createScene([0, 0], [0, 0]);

        const transitions: IBattleSceneTransition[][] = [[{
            from: startScene,
            to: subscene1,
            weight: 2
        }, {
            from: startScene,
            to: subscene2,
            weight: 1
        }], /**************************************************************************/  [{
            from: subscene1,
            to: subscene11,
            weight: 1
        }, {
            from: subscene1,
            to: diamond,
            weight: 2
        }, {
            from: subscene2,
            to: subscene22,
            weight: 5
        }, {
            from: subscene2,
            to: diamond,
            weight: 5
        }], /**************************************************************************/ [{
            from: subscene11,
            to: createScene([0, 0], [1, 1]),
            weight: 1
        }, {
            from: subscene11,
            to: dead,
            weight: 1
        }, {
            from: subscene22,
            to: createScene([1, 1], [0, 0]),
            weight: 1
        }, {
            from: subscene22,
            to: dead,
            weight: 1
        }, {
            from: diamond,
            to: createScene([1, 0], [1, 0]),
            weight: 1
        }, {
            from: diamond,
            to: dead,
            weight: 1
        }]];

        const result = collapseGraph(transitions, startScene);

        expect(result).to.be.eql(<IBattleGraphInfo>{
            scenes: [
                transitions[2][0].to,
                transitions[2][1].to,
                transitions[2][2].to,
                transitions[2][4].to,
            ],
            transitions: [{
                from: startScene,
                to: transitions[2][0].to,
                weight: 0.1111111111111111
            }, {
                from: startScene,
                to: transitions[2][1].to,
                weight: 0.49999999999999994
            }, {
                from: startScene,
                to: transitions[2][2].to,
                weight: 0.08333333333333333
            }, {
                from: startScene,
                to: transitions[2][4].to,
                weight: 0.3055555555555555
            }]
        })
    });
});
