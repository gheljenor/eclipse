import {connect} from "react-redux";
import {IState} from "../../reducers/i-state";

import {actionShipUpdate} from "./actions";
import Ship from "./component";

interface IShipContainerProps {
    shipId: string;
}

const mapStateToProps = (state: IState, ownProps: IShipContainerProps) => {
    return {
        ...state.ships.find(({id}) => id === ownProps.shipId).value,
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
