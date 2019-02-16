import {connect} from "react-redux";
import {State} from "../../reducers/state";

import {actionShipUpdate} from "./actions";
import Ship from "./component";

type IShipContainerProps = {
    shipId: number;
};

const mapStateToProps = (state: State, ownProps: IShipContainerProps) => {
    return {
        ...state.ships.list[ownProps.shipId],
        shipId: ownProps.shipId,
    };
};

const mapDispatchToProps = (dispatch, ownProps: IShipContainerProps) => {
    return {
        actionUpdate: (props) => dispatch(actionShipUpdate(ownProps.shipId, props)),
    };
};

export const ShipContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Ship);
