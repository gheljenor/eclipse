import {connect} from "react-redux";
import {IState} from "../../reducers/i-state";
import {actionWeaponAdd} from "../weapon-list/actions";

import {actionShipAdd, actionShipRemove} from "./actions";
import ShipList from "./component";

const shipCounters = {};

interface IShipListContainerProps {
    playerId: string;
}

function mapStateToProps(state: IState, ownProps: IShipListContainerProps) {
    return {ships: state.players[ownProps.playerId].ships};
}

function mapDispatchToProps(dispatch, ownProps: IShipListContainerProps) {
    if (!shipCounters[ownProps.playerId]) {
        shipCounters[ownProps.playerId] = 0;
    }

    return {
        actionAdd: () => {
            const shipAdd = actionShipAdd(ownProps.playerId);
            dispatch(shipAdd);
            dispatch(actionWeaponAdd(shipAdd.shipId));
        },
        actionRemove: (shipId) => dispatch(actionShipRemove(ownProps.playerId, shipId)),
    };
}

export const ShipListContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShipList);
