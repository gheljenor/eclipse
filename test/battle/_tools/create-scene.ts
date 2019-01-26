import {Battleship, EBattleShipType} from "../../../src/battle/battleship";
import {IBattleScene} from "../../../src/battle/sim/i-battle-scene";

export function createScene(first: number[], second: number[], defender: string = "f"): IBattleScene {
    const ships: Battleship[] = [];

    first.forEach((hp) => {
        ships.push(new Battleship(EBattleShipType.cruiser, "f", [], hp));
    });

    second.forEach((hp) => {
        ships.push(new Battleship(EBattleShipType.cruiser, "s", [], hp));
    });

    return {
        ships,
        defender,
    };
}
