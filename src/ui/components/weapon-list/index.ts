import {connect} from "react-redux";

import {State} from "../../reducers/state";
import {actionWeaponAdd, actionWeaponRemove} from "./actions";
import WeaponList from "./component";

type WeaponListContainerProps = {
    shipId: number;
};

function mapStateToProps(state: State, ownProps: WeaponListContainerProps) {
    return {weapons: state.ships.list[ownProps.shipId].weapons};
}

function mapDispatchToProps(dispatch, ownProps: WeaponListContainerProps) {
    return {
        actionAdd: () => dispatch(actionWeaponAdd(ownProps.shipId)),
        actionRemove: (weaponId) => dispatch(actionWeaponRemove(ownProps.shipId, weaponId)),
    };
}

export const WeaponListContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(WeaponList);
