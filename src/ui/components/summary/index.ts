import {connect} from "react-redux";

import {State} from "../../reducers/state";
import Summary from "./component";

function mapStateToProps(state: State) {
    return state.summary;
}

export const SummaryContainer = connect(mapStateToProps)(Summary);
