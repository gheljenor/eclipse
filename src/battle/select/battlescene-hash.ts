import {IBattleScene} from "../sim/i-battle-scene";

export function battleSceneHash(battleScene: IBattleScene): string {
    return battleScene.ships.map((ship) => ship.owner + ship.type + ship.hp).sort().join(",");
}
