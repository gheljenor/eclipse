import * as React from "react";

import {EWeaponDamageType, EWeaponType, IWeapon} from "../../../battle/i-weapon";

import InputNumber from "../input-number";
import InputSelect from "../input-select";

const styles = require("./index.pcss");

type WeaponType = { [key in EWeaponType]: string };
type WeaponDamageType = { [key in EWeaponDamageType]: string };

const weaponClassTitles: WeaponType = {
    [EWeaponType.gun]: "Gun",
    [EWeaponType.missile]: "Missile",
};

const weaponTypeTitles: WeaponDamageType = {
    [EWeaponDamageType.yellow]: "Yellow",
    [EWeaponDamageType.orange]: "Orange",
    [EWeaponDamageType.blue]: "Blue",
    [EWeaponDamageType.red]: "Red",
    [EWeaponDamageType.pink]: "Pink",
};

export type InputWeaponState = IWeapon & {
    count: number;
};

type InputWeaponProps = React.Props<InputWeapon> & InputWeaponState & {
    onChange: (value: InputWeaponState) => void;
};

const DEFAULT_TYPE = EWeaponType.gun;
const DEFAULT_DAMAGE_TYPE = EWeaponDamageType.yellow;
const DEFAULT_COUNT = 1;

export default class InputWeapon extends React.Component<InputWeaponProps, null> {
    public render() {
        return (
            <div className={styles.wrapper}>
                <InputSelect {...this.prop("type")} options={weaponClassTitles} />
                <InputSelect {...this.prop("damage")} options={weaponTypeTitles} />
                <InputNumber {...this.prop("count")} min={1} max={24} />
            </div>
        );
    }

    public static get defaultState(): InputWeaponState {
        return {
            damage: DEFAULT_DAMAGE_TYPE,
            type: DEFAULT_TYPE,
            count: DEFAULT_COUNT,
        };
    }

    private prop<Field extends keyof InputWeaponState>(field: Field) {
        return {
            value: this.props[field],
            onChange: this.handleChange(field),
        };
    }

    private handleChange = <Field extends keyof InputWeaponState>(field: Field) =>
        (value: InputWeaponState[Field]) => {
            this.props.onChange({
                damage: this.props.damage,
                type: this.props.type,
                count: this.props.count,
                [field]: value,
            });
        };
}
