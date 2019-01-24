import {IBattleScene, IBattleSceneTransition} from "../sim/i-battle-scene";
import {battleSceneHash} from "../select/battlescene-hash";
import {TGraphWay} from "../sim/t-graph-way";

export function normalizeGraph(transitions: IBattleSceneTransition[][], startScene: IBattleScene, excludeStart: boolean = true): IBattleSceneTransition[][] {
    const result: IBattleSceneTransition[][] = [];
    const startSceneHash: string = battleSceneHash(startScene);

    const leaves = transitions[transitions.length - 1];

    for (const layer of transitions) {
        const groups: TGraphWay = new Map();
        const subresult = [];
        result.push(subresult);

        for (const transition of layer) {
            if (!groups.has(transition.from)) {
                groups.set(transition.from, []);
            }

            if (leaves === layer && excludeStart) {
                const hash = battleSceneHash(transition.to);

                if (hash === startSceneHash) {
                    continue;
                }
            }

            subresult.push(transition);
            groups.get(transition.from).push(transition);
        }

        for (const [, group] of groups) {
            let total = 0;
            for (const {weight} of group) {
                total += weight;
            }
            for (const transition of group) {
                transition.weight /= total;
            }
        }
    }

    return result;
}
