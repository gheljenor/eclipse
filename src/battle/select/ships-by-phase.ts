import {Battleship} from "../battleship";

export function shipsByPhase(ships: Battleship[], phase: number[]): Battleship[] {
    const result: Battleship[] = [];

    for (const idx of phase) {
        const ship = ships[idx];

        if (ship.hp > 0) {
            result.push(ship);
        }
    }

    return result;
}
