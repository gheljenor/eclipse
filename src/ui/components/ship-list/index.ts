import {connect} from "react-redux";
import {State} from "../../reducers/state";

import {actionShipAdd, actionShipRemove} from "./actions";
import ShipList from "./component";

const shipCounters = {};

type ShipListContainerProps = {
    playerId: string;
};

function mapStateToProps(state: State, ownProps: ShipListContainerProps) {
    return {ships: state.players[ownProps.playerId].ships};
}

function mapDispatchToProps(dispatch, ownProps: ShipListContainerProps) {
    if (!shipCounters[ownProps.playerId]) {
        shipCounters[ownProps.playerId] = 0;
    }

    return {
        actionAdd: () => dispatch(actionShipAdd(ownProps.playerId)),
        actionRemove: (shipId) => dispatch(actionShipRemove(ownProps.playerId, shipId)),
    };
}

export const ShipListContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShipList);
