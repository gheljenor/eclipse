import {SummaryState} from "../components/summary/component";
import {AppState} from "./app";
import {PlayersState} from "./players";
import {ShipsState} from "./ships";
import {WeaponsState} from "./weapons";

export type State = {
    app: AppState;
    players: PlayersState;
    ships: ShipsState;
    summary: SummaryState;
    weapons: WeaponsState;
};
