import * as React from "react";

import {EWeaponDamageType, EWeaponType} from "../../../battle/i-weapon";
import StateHolder, {IStateHolderAction} from "../../lib/state-holder";
import EnumSelect from "../enum-select";
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
    onChange?: IStateHolderAction<IWeaponGroupState>;
}

const DEFAULT_CLASS = EWeaponType.gun;
const DEFAULT_TYPE = EWeaponDamageType.yellow;
const DEFAULT_COUNT = 1;

export default class WeaponGroup extends React.Component<IWeaponGroupProps, null> {
    public render() {
        const {weaponClass = DEFAULT_CLASS, type = DEFAULT_TYPE, count = DEFAULT_COUNT} = this.props;
        const state = {weaponClass, type, count};
        const holder = new StateHolder(state, this.props.onChange);

        return (
            <div className={styles.wrapper}>
                <EnumSelect
                    onChange={holder.onChange("weaponClass")}
                    options={weaponClassTitles}
                    state={weaponClass}
                />

                <EnumSelect
                    onChange={holder.onChange("type")}
                    options={weaponTypeTitles}
                    state={type}
                />

                <Spinner
                    onChange={holder.onChange("count")}
                    min={1}
                    max={24}
                    state={count}
                />
            </div>
        );
    }
}
