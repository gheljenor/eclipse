import {Battle} from "../data/battle";
import {BattleAttack} from "../data/battle-attack";
import {BattleTurn} from "../data/battle-turn";
import {BattleTurnPhase} from "../data/battle-turn-phase";
import {WeaponShot} from "../data/weapon-shot";
import {AttackTactics} from "./attack-tactics";

export const riftStupidTactics: AttackTactics = function (
    battle: Battle,
    battleTurn: BattleTurn,
    battleTurnPhase: BattleTurnPhase,
    battleAttack: BattleAttack,
    shots: WeaponShot[],
): number {
    return 0;
};
