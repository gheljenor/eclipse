import {BattleShip, BattleShipType} from "../../../src/battle/data/battle-ship";
import {IBattleScene} from "../../../src/battle/sim/i-battle-scene";

export function createScene(first: number[], second: number[], defender: string = "f"): IBattleScene {
    const ships: BattleShip[] = [];

    first.forEach((hp) => {
        ships.push(new BattleShip(BattleShipType.cruiser, "f", [], hp));
    });

    second.forEach((hp) => {
        ships.push(new BattleShip(BattleShipType.cruiser, "s", [], hp));
    });

    return {
        ships,
        defender,
    };
}
