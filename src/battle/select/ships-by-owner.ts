import {Battleship} from "../battleship";

export function shipsByOwner(ships: Battleship[], owner: string, exclude: boolean = false): Battleship[] {
    return ships.filter(function (ship) {
        return ship.hp > 0 && ship.owner === owner ? !exclude : exclude;
    });
}
