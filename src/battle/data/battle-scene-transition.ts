import {Battle} from "./battle";
import {BattleScene} from "./battle-scene";

type BattleSceneTransitionProps = {
    hash: string;
    from: BattleScene;
    to: BattleScene;
    possibleRing: boolean;
};

export class BattleSceneTransition implements BattleSceneTransitionProps {
    public readonly hash: string;
    public readonly from: BattleScene;
    public readonly to: BattleScene;
    public readonly possibleRing: boolean;

    public isRing?: boolean;
    public weight: number = 0;

    constructor(props: BattleSceneTransitionProps) {
        Object.assign(this, props);
        if (!this.possibleRing) {
            this.isRing = false;
        }
    }

    public static factory(battle: Battle, from: BattleScene, to: BattleScene, subHash: string = "") {
        const hash = subHash + from.hash + "->" + to.hash;

        const fromCache = battle.transitionCache[hash];
        if (fromCache) {
            return fromCache;
        }

        const possibleRing = from.hp <= to.hp;

        const battleSceneTransition = new BattleSceneTransition({hash, from, to, possibleRing});

        battle.transitionCache[hash] = battleSceneTransition;

        return battleSceneTransition;
    }
}
