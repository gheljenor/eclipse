import {connect} from "react-redux";

import {IState} from "../../reducers/i-state";
import {actionWeaponUpdate} from "./actions";
import InputWeapon from "./component";

interface IInputWeaponContainerProps {
    weaponId: string;
}

const mapStateToProps = (state: IState, ownProps: IInputWeaponContainerProps) => {
    return state.weapons.find(({id}) => id === ownProps.weaponId).value;
};

const mapDispatchToProps = (dispatch, ownProps: IInputWeaponContainerProps) => {
    return {
        onChange: (value) => dispatch(actionWeaponUpdate(ownProps.weaponId, value)),
    };
};

export const InputWeaponContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(InputWeapon);
