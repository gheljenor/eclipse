import {battleSummary} from "../../battle/select/battle-summary";
import {simulateBattle} from "../../battle/sim/simulate-battle";
import {SummaryResult, SummaryState} from "../components/summary/component";
import {State} from "../reducers/state";
import {makeBattlescene} from "./make-battlescene";
import {prepareSummary} from "./prepare-summary";

export function simulate(state: State): SummaryResult {
    const battleScene = makeBattlescene(state);
    const battleResults = simulateBattle(battleScene);
    const summary = battleSummary(battleResults);
    return prepareSummary(summary);
}
