import * as React from "react";

import {EWeaponDamageType, EWeaponType, IWeapon} from "../../../battle/i-weapon";

import InputNumber from "../input-number";
import InputSelect from "../input-select";

const styles = require("./index.pcss");

type IWeaponType = { [key in EWeaponType]: string };
type IWeaponDamageType = { [key in EWeaponDamageType]: string };

const weaponClassTitles: IWeaponType = {
    [EWeaponType.gun]: "Gun",
    [EWeaponType.missile]: "Missile",
};

const weaponTypeTitles: IWeaponDamageType = {
    [EWeaponDamageType.yellow]: "Yellow",
    [EWeaponDamageType.orange]: "Orange",
    [EWeaponDamageType.blue]: "Blue",
    [EWeaponDamageType.red]: "Red",
    [EWeaponDamageType.pink]: "Pink",
};

export interface IInputWeaponState extends IWeapon {
    count: number;
}

interface IInputWeaponProps extends React.Props<InputWeapon>, IInputWeaponState {
    onChange: (value: IInputWeaponState) => void;
}

const DEFAULT_TYPE = EWeaponType.gun;
const DEFAULT_DAMAGE_TYPE = EWeaponDamageType.yellow;
const DEFAULT_COUNT = 1;

export default class InputWeapon extends React.Component<IInputWeaponProps, null> {
    public render() {
        return (
            <div className={styles.wrapper}>
                <InputSelect {...this.prop("type")} options={weaponClassTitles} />
                <InputSelect {...this.prop("damage")} options={weaponTypeTitles} />
                <InputNumber {...this.prop("count")} min={1} max={24} />
            </div>
        );
    }

    public static get defaultState(): IInputWeaponState {
        return {
            damage: DEFAULT_DAMAGE_TYPE,
            type: DEFAULT_TYPE,
            count: DEFAULT_COUNT,
        };
    }

    private prop<Field extends keyof IInputWeaponState>(field: Field) {
        return {
            value: this.props[field],
            onChange: this.handleChange(field),
        };
    }

    private handleChange = <Field extends keyof IInputWeaponState>(field: Field) =>
        (value: IInputWeaponState[Field]) => {
            this.props.onChange({...this.props, [field]: value});
        };
}
