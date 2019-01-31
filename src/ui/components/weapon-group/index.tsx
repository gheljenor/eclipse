import * as React from "react";

import {EWeaponDamageType, EWeaponType} from "../../../battle/i-weapon";
import EnumTypeSelect from "../enum-select";
import Spinner from "../spinner";

const styles = require("./index.pcss");

type IWeaponClass = { [key in EWeaponType]: string };
type IWeaponType = { [key in EWeaponDamageType]: string };

const weaponTypeTitles: IWeaponType = {
    [EWeaponDamageType.yellow]: "Yellow",
    [EWeaponDamageType.orange]: "Orange",
    [EWeaponDamageType.blue]: "Blue",
    [EWeaponDamageType.red]: "Red",
    [EWeaponDamageType.pink]: "Pink",
};

const weaponClassTitles: IWeaponClass = {
    [EWeaponType.gun]: "Gun",
    [EWeaponType.missile]: "Missile",
};

export interface IWeaponGroupState {
    weaponClass?: EWeaponType;
    type?: EWeaponDamageType;
    count?: number;
}

interface IWeaponGroupProps extends React.Props<WeaponGroup>, IWeaponGroupState {
    onChange?: (value: IWeaponGroupState) => void;
}

export default class WeaponGroup extends React.Component<IWeaponGroupProps, null> {
    private classRef: React.RefObject<EnumTypeSelect<IWeaponClass, keyof IWeaponClass>>;
    private typeRef: React.RefObject<EnumTypeSelect<IWeaponType, keyof IWeaponType>>;
    private countRef: React.RefObject<Spinner>;

    constructor(props) {
        super(props);

        this.classRef = React.createRef();
        this.typeRef = React.createRef();
        this.countRef = React.createRef();
    }

    public render() {
        return (
            <div className={styles.wrapper}>
                <EnumTypeSelect
                    ref={this.classRef}
                    onChange={this.handleClassChange}
                    values={weaponClassTitles}
                    value={this.props.weaponClass}
                />

                <EnumTypeSelect
                    ref={this.typeRef}
                    onChange={this.handleTypeChange}
                    values={weaponTypeTitles}
                    value={this.props.type}
                />

                <Spinner
                    ref={this.countRef}
                    onChange={this.handleCoundChange}
                    min={1}
                    max={24}
                    value={this.props.count}
                />
            </div>
        );
    }

    private handleClassChange = (value: EWeaponType) => {
        this.update({weaponClass: value});
    };

    private handleTypeChange = (value: EWeaponDamageType) => {
        this.update({type: value});
    };

    private handleCoundChange = (value: number) => {
        this.update({count: value});
    };

    private update(partialState) {
        const state: IWeaponGroupState = Object.assign({
            type: this.typeRef.current.state.value,
            weaponClass: this.classRef.current.state.value,
            count: this.countRef.current.state.value,
        }, partialState);

        if (this.props.onChange) {
            this.props.onChange(state);
        }
    }
}
