import {connect} from "react-redux";

import {State} from "../../reducers/state";
import {actionWeaponUpdate} from "./actions";
import InputWeapon from "./component";

type InputWeaponContainerProps = {
    weaponId: number;
};

const mapStateToProps = (state: State, ownProps: InputWeaponContainerProps) => {
    return state.weapons.list[ownProps.weaponId];
};

const mapDispatchToProps = (dispatch, ownProps: InputWeaponContainerProps) => {
    return {
        onChange: (value) => dispatch(actionWeaponUpdate(ownProps.weaponId, value)),
    };
};

export const InputWeaponContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(InputWeapon);
