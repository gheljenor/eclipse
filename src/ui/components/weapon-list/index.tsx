import * as React from "react";

import {EWeaponDamageType, EWeaponType, IWeapon} from "../../../battle/i-weapon";

import WeaponGroup, {IWeaponGroupState} from "../weapon-group";

const styles = require("./index.pcss");

interface IBlueprintWeapon extends IWeapon {
    count: number;
}

export interface IWeaponListItem extends IBlueprintWeapon {
    id: number;
}

interface IWeaponListState {
    weapons: IWeaponListItem[];
}

interface IWeaponListProps extends React.Props<WeaponList> {
    weapons?: IBlueprintWeapon[];
    onChange?: (weapons: IWeaponListItem[]) => void;
}

export default class WeaponList extends React.Component<IWeaponListProps, IWeaponListState> {
    private counter: number = 1;

    constructor(props) {
        super(props);
        const {weapons = []} = props;

        weapons.forEach((weapon) => {
            weapon.id = this.counter++;
        });

        this.state = {weapons};
    }

    public render() {
        return (
            <ul className={styles.wrapper}>
                {this.renderWeapons()}
                <button
                    onClick={this.handleAddClick}
                    className={styles.add}
                >
                    Add weapon group
                </button>
            </ul>
        );
    }

    private renderWeapons() {
        return this.state.weapons.map((weapon) => (
            <li className={styles.weapon} key={weapon.id}>
                <WeaponGroup
                    onChange={this.handleWeaponChange(weapon.id)}
                    weaponClass={weapon.type}
                    type={weapon.damage}
                    count={weapon.count}
                />

                <button
                    onClick={this.handleRemoveClick(weapon.id)}
                    className={styles.remove}
                >
                    -
                </button>
            </li>
        ));
    }

    private handleAddClick = () => {
        const weapons = this.state.weapons.slice();

        weapons.push({
            id: this.counter++,
            type: EWeaponType.gun,
            damage: EWeaponDamageType.yellow,
            count: 1,
        });

        this.update({weapons});
    };

    private handleRemoveClick = (id) => () => {
        const weapons = this.state.weapons.filter((weapon) => weapon.id !== id);
        this.update({weapons});
    };

    private handleWeaponChange = (id) => (weaponState: IWeaponGroupState) => {
        const weapons = this.state.weapons.map((weapon) => {
            return weapon.id === id ? {
                id: weapon.id,
                type: weaponState.type,
                damage: weaponState.weaponClass,
                count: weaponState.count,
            } : weapon;
        });

        this.update({weapons});
    };

    private update(state) {
        this.setState(state);

        if (this.props.onChange) {
            this.props.onChange(state.weapons);
        }
    }
}
