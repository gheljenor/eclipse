import * as React from "react";
import {EWeaponDamageType, EWeaponType} from "../../../battle/i-weapon";
import EnumTypeSelect from "../enum-select";
import Spinner from "../spinner";

const styles = require("./index.pcss");

const weaponTypeTitles: { [key in EWeaponDamageType]: string } = {
    [EWeaponDamageType.yellow]: "Yellow",
    [EWeaponDamageType.orange]: "Orange",
    [EWeaponDamageType.blue]: "Blue",
    [EWeaponDamageType.red]: "Red",
    [EWeaponDamageType.pink]: "Pink",
};

const weaponClassTitles: { [key in EWeaponType]: string } = {
    [EWeaponType.gun]: "Gun",
    [EWeaponType.missile]: "Missile",
};

interface IWeaponGroupState {
    weaponClass?: EWeaponType;
    type?: EWeaponDamageType;
    count?: number;
}

interface IWeaponGroupProps extends React.Props<WeaponGroup>, IWeaponGroupState {
    onChange?: (value: IWeaponGroupState) => void;
}

export default class WeaponGroup extends React.Component<IWeaponGroupProps, IWeaponGroupState> {
    constructor(props) {
        super(props);

        this.state = {
            weaponClass: props.weaponClass,
            type: props.type,
            count: props.count,
        };
    }

    public render() {
        return (
            <div className={styles.wrapper}>
                <EnumTypeSelect onChange={this.setClass} values={weaponClassTitles} value={this.state.weaponClass} />
                <EnumTypeSelect onChange={this.setType} values={weaponTypeTitles} value={this.state.type} />
                <Spinner onChange={this.setCount} min={0} max={24} value={this.state.count} />
            </div>
        );
    }

    public setClass = (value: EWeaponType) => {
        this.update({weaponClass: value});
    };

    public setType = (value: EWeaponDamageType) => {
        this.update({type: value});
    };

    public setCount = (value: number) => {
        this.update({count: value});
    };

    private update(state) {
        this.setState(state);
        if (this.props.onChange) {
            this.props.onChange(this.state);
        }
    }
}
