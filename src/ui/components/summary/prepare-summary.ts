import {Battleship, EBattleShipType} from "../../../battle/battleship";
import {memo} from "../../../lib/memo";
import {ISummayProps} from "./i-summary-props";

interface IOutcomeDetails {
    type: EBattleShipType;
    count: number;
}

export interface IOutcome {
    probability: number;
    ships: IOutcomeDetails[];
}

export function prepareSummary(summary: ISummayProps) {
    const {players} = summary;

    const player1 = players[0];
    const player2 = players[1];

    return {
        [player1]: prepareDetails(summary, player1),
        [player2]: prepareDetails(summary, player2),
    };
}

function prepareDetails(summary, player) {
    const outcomes = Array.from(summary.scenes)
        .filter(([scene]) => scene.winner === player)
        .map(prepareOutcome);

    const result: { [key: string]: IOutcome } = {};

    outcomes.forEach((outcome) => {
        const hash = outcomeHash(outcome);
        if (result[hash]) {
            result[hash].probability += outcome.probability;
        } else {
            result[hash] = outcome;
        }
    });

    return Object.values(result).sort((a, b) => b.probability - a.probability);
}

function prepareOutcome([scene, probability]) {
    const player = scene.winner as string;
    const ships: Battleship[] = scene.ships.filter((ship) => ship.hp > 0 && ship.owner === player);

    const shipsByType = {};

    ships.forEach((ship) => {
        shipsByType[ship.type] = shipsByType[ship.type] || 0;
        shipsByType[ship.type]++;
    });

    const result: IOutcomeDetails[] = Object.entries(shipsByType)
        .map(([type, count]: [string, number]) => ({type: parseInt(type, 10), count}))
        .sort((a, b) => b.type - a.type);

    return {probability, ships: result};
}

const outcomeHash = memo(function (outcome: IOutcome) {
    return outcome.ships
        .map(({type, count}) => type + ":" + count)
        .join(",");
});
