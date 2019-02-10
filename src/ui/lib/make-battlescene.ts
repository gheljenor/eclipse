import {Battleship} from "../../battle/battleship";
import {IBattleScene} from "../../battle/sim/i-battle-scene";
import {IState} from "../reducers/i-state";

export function makeBattlescene(state: IState): IBattleScene {
    const players = ["first", "second"];

    const scene: IBattleScene = {
        ships: [],
        defender: state.players.defender,
    };

    players.forEach(function (playerName) {
        const player = state.players[playerName];

        player.ships.forEach(function (shipId) {
            const shipBlueprint = state.ships.find(({id}) => id === shipId).value;

            const ship = new Battleship(
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
                const weaponGroup = state.weapons.find(({id}) => id === weaponId).value;

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
