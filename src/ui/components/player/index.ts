import {connect} from "react-redux";

import {IState} from "../../reducers/i-state";
import {actionPlayerUpdate} from "./actions";
import Player from "./component";

interface IPlayerContainerProps {
    playerId: "first" | "second";
}

function mapStateToProps(state: IState, ownProps: IPlayerContainerProps) {
    const player = state.players[ownProps.playerId];
    return {
        ...player,
        playerId: ownProps.playerId,
        defender: state.players.defender === ownProps.playerId,
    };
}

function mapDispatchToProps(dispatch, ownProps: IPlayerContainerProps) {
    return {
        actionUpdate: (props) => dispatch(actionPlayerUpdate(ownProps.playerId, props)),
    };
}

export const PlayerContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Player);
