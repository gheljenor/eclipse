import {expect} from "chai";
import {describe, it} from "mocha";

import {simplifyGraph} from "../../../src/battle/optimize/simplify-graph";
import {IBattleSceneTransition} from "../../../src/battle/sim/i-battle-scene";
import {createScene} from "../_tools/create-scene";

describe("simplify-graph", function () {
    it("uniq", function () {
        const start = createScene([1, 1], [1, 1]);

        const transitions: IBattleSceneTransition[] = [{
            from: start,
            to: createScene([0, 1], [1, 1]),
            weight: 1,
        }, {
            from: start,
            to: createScene([1, 1], [0, 1]),
            weight: 1,
        }];

        expect(simplifyGraph(transitions)).to.be.eql({
            scenes: [
                transitions[0].to,
                transitions[1].to,
            ],
            transitions,
        });
    });

    it("deduplicate", function () {
        const start = createScene([1, 1], [1, 1]);

        const transitions: IBattleSceneTransition[] = [{
            from: start,
            to: createScene([0, 1], [1, 1]),
            weight: 1,
        }, {
            from: start,
            to: createScene([1, 1], [0, 1]),
            weight: 1,
        }, {
            from: start,
            to: createScene([1, 1], [0, 1]),
            weight: 1,
        }];

        expect(simplifyGraph(transitions)).to.be.eql({
            scenes: [
                transitions[0].to,
                transitions[1].to,
            ],
            transitions: [
                transitions[0],
                {
                    from: transitions[1].from,
                    to: transitions[1].to,
                    weight: 2,
                },
            ],
        });
    });

    it("two start -> one end", function () {
        const transitions: IBattleSceneTransition[] = [{
            from: createScene([1, 1], [0, 1]),
            to: createScene([0, 1], [0, 1]),
            weight: 1,
        }, {
            from: createScene([0, 1], [1, 1]),
            to: createScene([0, 1], [0, 1]),
            weight: 1,
        }];

        const simplified = simplifyGraph(transitions);

        expect(simplified).to.be.eql({
            scenes: [transitions[0].to],
            transitions,
        });

        expect(simplified.transitions[0].to).to.be.equal(simplified.transitions[1].to);
    });
});
