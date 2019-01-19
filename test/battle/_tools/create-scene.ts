import {IBattleScene} from "../../../src/battle/sim/i-battle-scene";
import {Battleship, BattleShipType} from "../../../src/battle/battleship";

export function createScene(first: number[], second: number[], defender: string = "first"): IBattleScene {
    const ships: Battleship[] = [];

    first.forEach((hp) => {
        ships.push(new Battleship(BattleShipType.cruiser, "first", [], hp));
    });

    second.forEach((hp) => {
        ships.push(new Battleship(BattleShipType.cruiser, "second", [], hp));
    });

    return {
        ships,
        defender
    };
}
