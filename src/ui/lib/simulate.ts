import {battleSummary} from "../../battle/select/battle-summary";
import {simulateBattle} from "../../battle/sim/simulate-battle";
import {ISummaryState} from "../components/summary/component";
import {IState} from "../reducers/i-state";
import {makeBattlescene} from "./make-battlescene";
import {prepareSummary} from "./prepare-summary";

export function simulate(state: IState): ISummaryState {
    const battleScene = makeBattlescene(state);
    const battleResults = simulateBattle(battleScene);
    const summary = battleSummary(battleResults);
    return prepareSummary(summary);
}
