import {Battle} from "./battle";
import {BattleScene} from "./battle-scene";
import {BattleGraph} from "./battle-graph";

type BattleTurnProps = {
    hash: string;
    startScene: BattleScene;
    isFirstTurn: boolean;
};

export class BattleTurn implements BattleTurnProps {
    public readonly hash: string;
    public readonly startScene: BattleScene;
    public readonly isFirstTurn: boolean;

    public results?: BattleGraph;

    constructor(props: BattleTurnProps) {
        Object.assign(this, props);
    }

    public static factory(
        battle: Battle,
        battleScene: BattleScene,
        isFirstTurn: boolean,
    ) {
        const hash = isFirstTurn + ":" + battleScene.hash;

        const fromCache = battle.turnCache[hash];
        if (fromCache) {
            return fromCache;
        }

        const battleTurn = new BattleTurn({hash, isFirstTurn, startScene: battleScene});

        battle.turnCache[hash] = battleTurn;

        return battleTurn;
    }
}
