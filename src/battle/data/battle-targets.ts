import {BattleShip} from "./battle-ship";
import {Battle} from "./battle";
import {BattleScene} from "./battle-scene";
import {BattleTurn} from "./battle-turn";

type BattleTargetsProps = {
    hash: string;
    ships: BattleShip[];
    defs: number[];
};

export class BattleTargets implements BattleTargetsProps {
    public readonly hash: string;
    public readonly ships: BattleShip[];
    public readonly defs: number[];

    constructor(props: BattleTargetsProps) {
        Object.assign(this, props);
    }

    public static factory(
        battle: Battle,
        battleTurn: BattleTurn,
        battleScene: BattleScene,
        enemy: string,
    ) {
        const ships = battleScene
            .byOwnerAlive(battle.otherPlayer(enemy))
            .slice().sort((a, b) => b.defence - a.defence);

        const defs = ships.map((ship) => ship.defence);

        const hash = defs.join(",");

        const fromCache = battle.targetsCache[hash];
        if (fromCache) {
            return fromCache;
        }

        const targets = new BattleTargets({hash, ships, defs});

        battle.targetsCache[hash] = targets;

        return targets;

    }
}
