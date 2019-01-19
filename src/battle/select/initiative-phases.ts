import {IBattleScene} from "../sim/i-battle-scene";
import {Battleship} from "../battleship";

export function initiativePhases(scene: IBattleScene): number[][] {
    const initiative: { [phase: string]: number[] } = Object.create(null);

    scene.ships.forEach(function (ship: Battleship, idx: number) {
        const phase = ship.owner + ship.initiative + ship.attack;

        if (!initiative[phase]) {
            initiative[phase] = [];
        }

        initiative[phase].push(idx);
    });

    return Object.values(initiative).sort(function ([a], [b]): number {
        const aShip = scene.ships[a];
        const bShip = scene.ships[b];

        if (aShip.initiative === bShip.initiative) {
            if (aShip.owner === bShip.owner) { return 0; }
            return aShip.owner === scene.defender ? -1 : 1;
        }

        return bShip.initiative - aShip.initiative;
    });
}
