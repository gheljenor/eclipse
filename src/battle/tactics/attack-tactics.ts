import {Battle} from "../data/battle";
import {BattleAttack} from "../data/battle-attack";
import {BattleTurn} from "../data/battle-turn";
import {BattleTurnPhase} from "../data/battle-turn-phase";
import {WeaponShot} from "../data/weapon-shot";

export type AttackTactics = (
    battle: Battle,
    battleTurn: BattleTurn,
    battleTurnPhase: BattleTurnPhase,
    battleAttack: BattleAttack,
    shots: WeaponShot[],
) => number;
