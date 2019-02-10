import {connect} from "react-redux";

import {IState} from "../reducers/i-state";
import {actionAppAutoSim, actionAppSimulate} from "./actions";
import App from "./component";

function mapStateToProps(state: IState) {
    return state.app;
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
