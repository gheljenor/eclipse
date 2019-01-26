import {battleSceneHash} from "../select/battlescene-hash";
import {IBattleScene, IBattleSceneTransition} from "../sim/i-battle-scene";
import {TGraphWay} from "../sim/t-graph-way";
import {removeRing} from "./remove-ring";

/**
 * Нормализация ветвей графа
 * @param layers
 * @param startScene
 * @param excludeStart
 */
export function normalizeGraph(
    layers: IBattleSceneTransition[][],
    startScene: IBattleScene,
    excludeStart: boolean = true,
): IBattleSceneTransition[][] {
    const result: IBattleSceneTransition[][] = [];
    const startSceneHash: string = battleSceneHash(startScene);
    const transitions: IBattleSceneTransition[] = [];
    const rings: IBattleSceneTransition[] = [];

    const leaves = layers[layers.length - 1];

    for (const layer of layers) {
        const groups: TGraphWay = new Map();
        const subresult = [];
        result.push(subresult);

        for (const transition of layer) {
            if (!groups.has(transition.from)) {
                groups.set(transition.from, []);
            }

            groups.get(transition.from).push(transition);
            transitions.push(transition);

            if (leaves === layer && excludeStart) {
                const hash = battleSceneHash(transition.to);

                if (hash === startSceneHash) {
                    transition.to = startScene;
                    transition.posibleRing = true;
                    rings.push(transition);
                    continue;
                }
            }

            subresult.push(transition);
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

    rings.forEach((ring) => removeRing(transitions, ring));

    return result;
}
