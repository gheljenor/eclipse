import {ISummaryState} from "../components/summary/component";
import {IAppState} from "./app";
import {IPlayersState} from "./players";
import {IShipsState} from "./ships";
import {IWeaponsState} from "./weapons";

export interface IState {
    app: IAppState;
    players: IPlayersState;
    ships: IShipsState;
    summary: ISummaryState;
    weapons: IWeaponsState;
}
