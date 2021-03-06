import {connect} from "react-redux";

import {State} from "../reducers/state";
import {actionAppAutoSim, actionAppSimulate} from "./actions";
import App from "./component";

function mapStateToProps(state: State) {
    return {
        ...state.app,
        state: state.summary.state,
        duration: state.summary.duration,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionSimulate: () => dispatch(actionAppSimulate()),
        actionAutosim: (value) => dispatch(actionAppAutoSim(value)),
    };
}

export const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
