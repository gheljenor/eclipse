import {expect} from "chai";
import {describe, it} from "mocha";
import {removeRing} from "../../../src/battle/optimize/remove-ring";
import {IBattleSceneTransition} from "../../../src/battle/sim/i-battle-scene";
import {createScene} from "../_tools/create-scene";
import {showTransition} from "../_tools/show-transition";

const f2s2 = createScene([1, 1], [1, 1]);
const f2s1 = createScene([1, 1], [1, 0]);
const f2s0 = createScene([1, 1], [0, 0]);

const f1s2 = createScene([1, 0], [1, 1]);
const f1s1 = createScene([1, 0], [1, 0]);
const f1s0 = createScene([1, 0], [0, 0]);

const f0s2 = createScene([0, 0], [1, 1]);
const f0s1 = createScene([0, 0], [1, 0]);
const f0s0 = createScene([0, 0], [0, 0]);

describe("remove-ring", function () {
    it("diamond", function () {
        const graph: IBattleSceneTransition[] = [
            {from: f2s2, to: f1s2, weight: 0.5},
            {from: f2s2, to: f2s1, weight: 0.5},

            {from: f1s2, to: f1s1, weight: 0.5},
            {from: f1s2, to: f0s2, weight: 0.5},

            {from: f2s1, to: f1s1, weight: 0.5, posibleRing: true},
            {from: f2s1, to: f2s0, weight: 0.5},
        ];

        const clone = graph.concat([]);

        removeRing(graph, graph[4]);

        expect(graph).to.be.eql(clone);
        expect(graph[4].posibleRing).to.be.undefined;
    });

    it("1 layer ring", function () {
        const graph: IBattleSceneTransition[] = [
            {from: f2s2, to: f2s1, weight: 0.5},
            {from: f2s2, to: f1s2, weight: 0.5},

            {from: f1s2, to: f2s2, weight: 0.2, posibleRing: true},
            {from: f1s2, to: f1s1, weight: 0.4},
            {from: f1s2, to: f1s0, weight: 0.4},
        ];

        /*
        console.log(graphSandbox({
            f2s2: {f2s1: 0.5, f1s2: 0.5},
            f1s2: {f2s2: 0.2, f1s1: 0.4, f1s0: 0.4}
        }, "f2s2", {f1s2: "f2s2"}));
        //*/

        removeRing(graph, graph[2]);

        expect(graph.map(showTransition)).to.be.eql([
                "{\"from\":\"f11,f11,s11,s11\",\"to\":\"f11,f11,s10,s11\",\"weight\":0.5555555555555556}",
                "{\"from\":\"f11,f11,s11,s11\",\"to\":\"f10,f11,s11,s11\",\"weight\":0.4444444444444445}",
                "{\"from\":\"f10,f11,s11,s11\",\"to\":\"f10,f11,s10,s11\",\"weight\":0.5}",
                "{\"from\":\"f10,f11,s11,s11\",\"to\":\"f10,f11,s10,s10\",\"weight\":0.5}",
            ],
        );

    });

    it("2 layer ring", function () {
        const graph: IBattleSceneTransition[] = [
            {from: f2s2, to: f2s1, weight: 0.5},
            {from: f2s2, to: f1s2, weight: 0.5},

            {from: f2s1, to: f1s1, weight: 0.5},
            {from: f2s1, to: f2s0, weight: 0.5},

            {from: f1s2, to: f0s2, weight: 0.5},
            {from: f1s2, to: f0s1, weight: 0.5},

            {from: f2s0, to: f2s2, weight: 0.4, posibleRing: true},
            {from: f2s0, to: f1s0, weight: 0.3},
            {from: f2s0, to: f0s0, weight: 0.3},
        ];

        /*
        console.log(graphSandbox({
            f2s2: {f2s1: 0.5,f1s2: 0.5},
            f2s1: {f1s1: 0.5,f2s0: 0.5},
            f1s2: {f0s2: 0.5,f0s1: 0.5},
            f2s0: {f2s2: 0.4,f1s0: 0.3,f0s0: 0.3}
        }, "f2s2", {f2s0: "f2s2"}));
        //*/

        removeRing(graph, graph[6]);

        expect(graph.map(showTransition)).to.be.eql([
                "{\"from\":\"f11,f11,s11,s11\",\"to\":\"f11,f11,s10,s11\",\"weight\":0.4444444444444445}",
                "{\"from\":\"f11,f11,s11,s11\",\"to\":\"f10,f11,s11,s11\",\"weight\":0.5555555555555556}",
                "{\"from\":\"f11,f11,s10,s11\",\"to\":\"f10,f11,s10,s11\",\"weight\":0.625}",
                "{\"from\":\"f11,f11,s10,s11\",\"to\":\"f11,f11,s10,s10\",\"weight\":0.37499999999999994}",
                "{\"from\":\"f10,f11,s11,s11\",\"to\":\"f10,f10,s11,s11\",\"weight\":0.5}",
                "{\"from\":\"f10,f11,s11,s11\",\"to\":\"f10,f10,s10,s11\",\"weight\":0.5}",
                "{\"from\":\"f11,f11,s10,s10\",\"to\":\"f10,f11,s10,s10\",\"weight\":0.5}",
                "{\"from\":\"f11,f11,s10,s10\",\"to\":\"f10,f10,s10,s10\",\"weight\":0.5}",
            ],
        );
    });

    it("diamond and ring", function () {
        const graph: IBattleSceneTransition[] = [
            {from: f2s2, to: f2s1, weight: 0.5},
            {from: f2s2, to: f1s2, weight: 0.5},

            {from: f2s1, to: f1s1, weight: 0.2},
            {from: f2s1, to: f2s0, weight: 0.8},

            {from: f1s2, to: f1s1, weight: 0.5},
            {from: f1s2, to: f0s2, weight: 0.5},

            {from: f1s1, to: f1s0, weight: 0.3},
            {from: f1s1, to: f0s1, weight: 0.3},
            {from: f1s1, to: f2s2, weight: 0.4, posibleRing: true},
        ];

        /*
        console.log(graphSandbox({
            f2s2: {f2s1: 0.5, f1s2: 0.5},
            f2s1: {f1s1a: 0.2, f2s0: 0.8},
            f1s2: {f1s1b: 0.5, f0s2: 0.5},
            f1s1a: {f1s0a: 0.3, f0s1a: 0.3, f2s2: 0.4},
            f1s1b: {f1s0b: 0.3, f0s1b: 0.3, f2s2: 0.4}
        }, "f2s2", {f1s1a: "f2s2", f1s1b: "f2s2"}));
        //*/

        removeRing(graph, graph[8]);

        expect(graph.map(showTransition)).to.be.eql([
            "{\"from\":\"f11,f11,s11,s11\",\"to\":\"f11,f11,s10,s11\",\"weight\":0.5348837209302325}",
            "{\"from\":\"f11,f11,s11,s11\",\"to\":\"f10,f11,s11,s11\",\"weight\":0.4651162790697675}",
            "{\"from\":\"f11,f11,s10,s11\",\"to\":\"f10,f11,s10,s11\",\"weight\":0.13043478260869565}",
            "{\"from\":\"f11,f11,s10,s11\",\"to\":\"f11,f11,s10,s10\",\"weight\":0.8695652173913043}",
            "{\"from\":\"f10,f11,s11,s11\",\"to\":\"f10,f11,s10,s11\",\"weight\":0.37499999999999994}",
            "{\"from\":\"f10,f11,s11,s11\",\"to\":\"f10,f10,s11,s11\",\"weight\":0.625}",
            "{\"from\":\"f10,f11,s10,s11\",\"to\":\"f10,f11,s10,s10\",\"weight\":0.5}",
            "{\"from\":\"f10,f11,s10,s11\",\"to\":\"f10,f10,s10,s11\",\"weight\":0.5}",
        ]);
    });
});
