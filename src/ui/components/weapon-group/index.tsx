import * as React from "react";

import {EWeaponDamageType, EWeaponType, IWeapon} from "../../../battle/i-weapon";
import StateHolder, {IStateHolderAction} from "../../lib/state-holder";
import EnumSelect from "../enum-select";
import NumberInput from "../number-input";

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

export interface IWeaponGroupState extends IWeapon {
    count: number;
}

interface IWeaponGroupProps extends React.Props<WeaponGroup>, Partial<IWeaponGroupState> {
    onChange: IStateHolderAction<IWeaponGroupState>;
}

const DEFAULT_TYPE = EWeaponType.gun;
const DEFAULT_DAMAGE_TYPE = EWeaponDamageType.yellow;
const DEFAULT_COUNT = 1;

export default class WeaponGroup extends React.Component<IWeaponGroupProps, null> {
    public render() {
        const {damage = DEFAULT_DAMAGE_TYPE, type = DEFAULT_TYPE, count = DEFAULT_COUNT} = this.props;
        const state = {damage, type, count};
        const holder = new StateHolder(state, this.props.onChange);

        return (
            <div className={styles.wrapper}>
                <EnumSelect
                    onChange={holder.onChange("type")}
                    options={weaponClassTitles}
                    state={type}
                />

                <EnumSelect
                    onChange={holder.onChange("damage")}
                    options={weaponTypeTitles}
                    state={damage}
                />

                <NumberInput
                    onChange={holder.onChange("count")}
                    min={1}
                    max={24}
                    state={count}
                />
            </div>
        );
    }

    public static get defaultState(): IWeaponGroupState {
        return {
            damage: DEFAULT_DAMAGE_TYPE,
            type: DEFAULT_TYPE,
            count: DEFAULT_COUNT,
        };
    }
}
