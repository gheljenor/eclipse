import {IBattleScene} from "../sim/i-battle-scene";
import {getSceneWeightByGraphWay} from "./get-scene-weight";
import {IBattleGraphInfo} from "./i-battle-graph-info";
import {prepareWays} from "./prepare-ways";

export interface IBattleSummary {
    scenes: Map<IBattleScene, number>;
    results: { [player: string]: number };
}

export function battleSummary(battleResult: IBattleGraphInfo): IBattleSummary {
    const scenes: Map<IBattleScene, number> = new Map();

    const {wayUp} = prepareWays(battleResult.transitions);

    for (const scene of battleResult.scenes) {
        scenes.set(scene, getSceneWeightByGraphWay(wayUp, scene));
    }

    const results: { [player: string]: number } = {};

    for (const [scene, weight] of scenes) {
        const winner: string = scene.winner === true ? "none" : scene.winner;
        if (!results[winner]) {
            results[winner] = 0;
        }
        results[winner] += weight;
    }

    return {scenes, results};
}
