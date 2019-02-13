import {connect} from "react-redux";

import {State} from "../../reducers/state";
import {actionPlayerUpdate} from "./actions";
import Player from "./component";

type PlayerContainerProps = {
    playerId: "first" | "second";
};

function mapStateToProps(state: State, ownProps: PlayerContainerProps) {
    const player = state.players[ownProps.playerId];
    return {
        ...player,
        playerId: ownProps.playerId,
        defender: state.players.defender === ownProps.playerId,
    };
}

function mapDispatchToProps(dispatch, ownProps: PlayerContainerProps) {
    return {
        actionUpdate: (props) => dispatch(actionPlayerUpdate(ownProps.playerId, props)),
    };
}

export const PlayerContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Player);
