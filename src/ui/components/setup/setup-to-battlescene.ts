import {ISetupState} from "./index";

import {Battleship} from "../../../battle/battleship";
import {IBattleScene} from "../../../battle/sim/i-battle-scene";

export function setupToBattlescene(setup: ISetupState): IBattleScene {
    const players = [setup.player1, setup.player2];

    const scene: IBattleScene = {
        ships: [],
        defender: players[setup.defender].player,
    };

    players.forEach(function (player) {
        player.ships.forEach(function (shipBlueprint) {
            const ship = new Battleship(
                shipBlueprint.type,
                player.player,
                [],
                shipBlueprint.hp,
                shipBlueprint.initiative,
                shipBlueprint.defence,
                shipBlueprint.attack,
                shipBlueprint.heal,
            );

            shipBlueprint.weapons.forEach((weaponGroup) => {
                const {count, ...weapon} = weaponGroup;
                for (let i = 0; i < count; i++) {
                    ship.weapons.push(weapon);
                }
            });

            for (let i = 0; i < shipBlueprint.count; i++) {
                scene.ships.push(ship.clone());
            }
        });
    });

    return scene;
}
