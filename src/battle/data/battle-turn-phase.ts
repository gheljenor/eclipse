import {Battle} from "./battle";
import {BattleAttackers} from "./battle-attackers";
import {BattleScene} from "./battle-scene";
import {BattleSceneTransition} from "./battle-scene-transition";
import {BattleTargets} from "./battle-targets";
import {BattleTurn} from "./battle-turn";
import {BattleGraph} from "./battle-graph";

type BattleTurnPhaseProps = {
    hash: string;
    startScene: BattleScene;
    player: string;
    initiative: number;
    attackers: BattleAttackers;
    targets: BattleTargets;
};

export class BattleTurnPhase implements BattleTurnPhaseProps {
    public readonly hash: string;
    public readonly startScene: BattleScene;
    public readonly player: string;
    public readonly initiative: number;

    public readonly attackers: BattleAttackers;
    public readonly targets: BattleTargets;

    public readonly attackCache: { [key: string]: BattleSceneTransition };

    public results?: BattleGraph;

    constructor(props: BattleTurnPhaseProps) {
        Object.assign(this, props);

        this.attackCache = Object.create(null);
    }

    public static factory(
        battle: Battle,
        battleTurn: BattleTurn,
        battleScene: BattleScene,
        initiative: number,
    ) {
        const player = battleScene.ships[battle.phases[initiative][0]].owner;

        const attackers = BattleAttackers.factory(battle, battleTurn, battleScene, initiative);
        const targets = BattleTargets.factory(battle, battleTurn, battleScene, player);

        const hash = attackers.hash + "::" + targets.hash;

        const fromCache = battle.turnPhaseCache[hash];
        if (fromCache) {
            return fromCache;
        }

        const battleTurnPhase = new BattleTurnPhase({
            startScene: battleScene, hash, player, initiative, attackers, targets,
        });

        battle.turnPhaseCache[hash] = battleTurnPhase;

        return battleTurnPhase;

    }

    public riftSubPhase(
        battle: Battle,
        battleTurn: BattleTurn,
        battleScene: BattleScene,
        selfDamage: number,
    ) {
        const player = battle.otherPlayer(this.player);

        const targets = BattleTargets.factory(battle, battleTurn, battleScene, player);
        const attackers = BattleAttackers.factoryRift(battle, battleTurn, battleScene, selfDamage);

        const hash = attackers.hash + "::" + targets.hash;

        const fromCache = battle.turnPhaseCache[hash];
        if (fromCache) {
            return fromCache;
        }

        const battleTurnPhase = new BattleTurnPhase({
            startScene: battleScene, hash, player, initiative: this.initiative, attackers, targets,
        });

        battle.turnPhaseCache[hash] = battleTurnPhase;

        return battleTurnPhase;
    }
}
