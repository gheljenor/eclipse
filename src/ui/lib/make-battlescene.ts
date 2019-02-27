import {BattleShip} from "../../battle/data/battle-ship";
import {IBattleScene} from "../../battle/sim/i-battle-scene";
import {State} from "../reducers/state";

export function makeBattlescene(state: State): IBattleScene {
    const players = ["first", "second"];

    const scene: IBattleScene = {
        ships: [],
        defender: state.players.defender,
    };

    players.forEach(function (playerName) {
        const player = state.players[playerName];

        player.ships.forEach(function (shipId) {
            const shipBlueprint = state.ships.list[shipId];

            const ship = new BattleShip(
                shipBlueprint.type,
                playerName,
                [],
                shipBlueprint.hp,
                shipBlueprint.initiative,
                shipBlueprint.defence,
                shipBlueprint.attack,
                shipBlueprint.heal,
            );

            shipBlueprint.weapons.forEach((weaponId) => {
                const weaponGroup = state.weapons.list[weaponId];

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
