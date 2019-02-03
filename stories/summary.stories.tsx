import {storiesOf} from "@storybook/react";
import * as React from "react";
import {Battleship, EBattleShipType} from "../src/battle/battleship";
import {IBattleSummary} from "../src/battle/select/battle-summary";
import {IBattleScene} from "../src/battle/sim/i-battle-scene";
import Summary from "../src/ui/components/summary";

function summaryScenesFromArray(scenes: Array<[IBattleScene, number]>) {
    const result = new Map();
    scenes.forEach(([scene, prob]) => {
        result.set(scene, prob);
    });
    return result;
}

const player = "Player";
const enemy = "Enemy";

const example1: IBattleSummary = {
    results: {
        [player]: 0.7,
        [enemy]: 0.3,
    },
    scenes: summaryScenesFromArray([
        [{
            ships: [
                new Battleship(EBattleShipType.interceptor, player, [], 1),
                new Battleship(EBattleShipType.interceptor, player, [], 1),
                new Battleship(EBattleShipType.interceptor, enemy, [], 0),
            ],
            defender: player,
            winner: player,
        }, 0.4], [{
            ships: [
                new Battleship(EBattleShipType.interceptor, player, [], 1),
                new Battleship(EBattleShipType.interceptor, player, [], 0),
                new Battleship(EBattleShipType.interceptor, enemy, [], 0),
            ],
            defender: player,
            winner: player,
        }, 0.3], [{
            ships: [
                new Battleship(EBattleShipType.interceptor, player, [], 0),
                new Battleship(EBattleShipType.interceptor, player, [], 0),
                new Battleship(EBattleShipType.interceptor, enemy, [], 1),
            ],
            defender: player,
            winner: enemy,
        }, 0.3],
    ]),
};

storiesOf("Summary", module)
    .add("example 1", () => <Summary players={[player, enemy]} {...example1} />);
