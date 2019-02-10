import {connect} from "react-redux";

import {IState} from "../../reducers/i-state";
import Summary from "./component";

function mapStateToProps(state: IState) {
    return state.summary;
}

export const SummaryContainer = connect(mapStateToProps)(Summary);
