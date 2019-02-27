import {BattleShip, BattleShipType} from "../../battle/data/battle-ship";
import {IBattleSummary} from "../../battle/select/battle-summary";
import {memo} from "../../lib/memo";
import {SummaryDetails} from "../components/summary/component";

type OutcomeDetails = {
    type: BattleShipType;
    count: number;
};

export type Outcome = {
    probability: number;
    ships: OutcomeDetails[];
};

export function prepareSummary(summary: IBattleSummary): SummaryDetails {
    const {results} = summary;
    const outcomes = {
        first: prepareDetails(summary, "first"),
        second: prepareDetails(summary, "second"),
    };
    return {results, outcomes};
}

function prepareDetails(summary, player) {
    const outcomes = Array.from(summary.nextScenes)
        .filter(([scene]) => scene.winner === player)
        .map(prepareOutcome);

    const result: { [key: string]: Outcome } = {};

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
    const ships: BattleShip[] = scene.ships.filter((ship) => ship.hp > 0 && ship.owner === player);

    const shipsByType = {};

    ships.forEach((ship) => {
        shipsByType[ship.type] = shipsByType[ship.type] || 0;
        shipsByType[ship.type]++;
    });

    const result: OutcomeDetails[] = Object.entries(shipsByType)
        .map(([type, count]: [string, number]) => ({type: parseInt(type, 10), count}))
        .sort((a, b) => b.type - a.type);

    return {probability, ships: result};
}

const outcomeHash = memo(function (outcome: Outcome) {
    return outcome.ships
        .map(({type, count}) => type + ":" + count)
        .join(",");
});
