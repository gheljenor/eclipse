import {Battleship} from "../battleship";

export function getWinner(ships: Battleship[]): string | null {
    const aliveShips = Object.create(null);

    ships.forEach(function ({hp, owner}) {
        if (!aliveShips[owner]) {
            aliveShips[owner] = 0;
        }
        if (hp > 0) {
            aliveShips[owner]++
        }
    });

    const owners = Object.keys(aliveShips);

    if (!aliveShips[owners[0]] && aliveShips[owners[1]]) {
        return owners[1];
    } else if (!aliveShips[owners[1]] && aliveShips[owners[0]]) {
        return owners[0];
    }

    return null;
}
