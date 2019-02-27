import {memo} from "../../lib/memo";

import {BattleShip} from "./battle-ship";
import {BattleAttack} from "./battle-attack";
import {BattleAttackers} from "./battle-attackers";
import {BattleScene} from "./battle-scene";
import {BattleTargets} from "./battle-targets";
import {BattleTurn} from "./battle-turn";
import {BattleTurnPhase} from "./battle-turn-phase";
import {SceneCache, TransitionCache} from "./types";

type BattleProps = {
    startScene: BattleScene;
    defender: string;
    phases: number[][];
    players: string[];
};

type TurnCache = { [key: string]: BattleTurn };
type TurnPhaseCache = { [key: string]: BattleTurnPhase; };
type AttackerCache = { [key: string]: BattleAttackers; };
type TargetCache = { [key: string]: BattleTargets; };
type AttackCache = { [key: string]: BattleAttack; };

export class Battle implements BattleProps {
    public readonly startScene: BattleScene;
    public readonly defender: string;
    public readonly phases: number[][];
    public readonly players: string[];

    public readonly turnCache: TurnCache;
    public readonly turnPhaseCache: TurnPhaseCache;
    public readonly attackersCache: AttackerCache;
    public readonly targetsCache: TargetCache;
    public readonly attackCache: AttackCache;

    public readonly sceneCache: SceneCache;
    public readonly transitionCache: TransitionCache;

    public readonly otherPlayer = memo((player) => {
        return this.players.find((p) => p !== player);
    });

    constructor(props: BattleProps) {
        Object.assign(this, props);

        this.turnCache = Object.create(null);
        this.turnPhaseCache = Object.create(null);
        this.attackersCache = Object.create(null);
        this.targetsCache = Object.create(null);
        this.attackCache = Object.create(null);

        this.sceneCache = Object.create(null);
        this.transitionCache = Object.create(null);
    }

    public static factory(battleScene: BattleScene, defender: string) {
        const phases = Battle.getPhases(battleScene, defender);
        const players = Battle.getPlayers(battleScene);
        return new Battle({startScene: battleScene, defender, phases, players});
    }

    public static getPlayers(battleScene: BattleScene) {
        const players = Object.create(null);
        battleScene.ships.forEach((ship) => players[ship.owner] = true);
        return Object.keys(players);
    }

    public static getPhases(battleScene: BattleScene, defender: string) {
        const initiative: { [phase: string]: number[] } = Object.create(null);

        battleScene.ships.forEach(function (ship: BattleShip, idx: number) {
            const phase = ship.owner + ship.initiative + ship.attack;

            if (!initiative[phase]) {
                initiative[phase] = [];
            }

            initiative[phase].push(idx);
        });

        return Object.values(initiative).sort(function ([a], [b]): number {
            const aShip = battleScene.ships[a];
            const bShip = battleScene.ships[b];

            if (aShip.initiative === bShip.initiative) {
                if (aShip.owner === bShip.owner) {
                    return 0;
                }
                return aShip.owner === defender ? -1 : 1;
            }

            return bShip.initiative - aShip.initiative;
        });
    }
}
