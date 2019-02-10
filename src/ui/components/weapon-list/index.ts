import {connect} from "react-redux";

import {IState} from "../../reducers/i-state";
import {actionWeaponAdd, actionWeaponRemove} from "./actions";
import WeaponList from "./component";

interface IWeaponListContainerProps {
    shipId: string;
}

function mapStateToProps(state: IState, ownProps: IWeaponListContainerProps) {
    return {weapons: state.ships.find(({id}) => id === ownProps.shipId).value.weapons};
}

function mapDispatchToProps(dispatch, ownProps: IWeaponListContainerProps) {
    return {
        actionAdd: () => dispatch(actionWeaponAdd(ownProps.shipId)),
        actionRemove: (weaponId) => dispatch(actionWeaponRemove(ownProps.shipId, weaponId)),
    };
}

export const WeaponListContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(WeaponList);
