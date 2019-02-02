import * as React from "react";

import StateHolder, {IStateHolderAction} from "../../lib/state-holder";
import WeaponGroup, {IWeaponGroupState} from "../weapon-group";

const styles = require("./index.pcss");
import "../../lib/index.pcss";

interface IWeaponListProps extends React.Props<WeaponList> {
    weapons?: Array<Partial<IWeaponGroupState>>;
    onChange: IStateHolderAction<IWeaponGroupState[]>;
}

export default class WeaponList extends React.Component<IWeaponListProps, null> {
    public render() {
        return (
            <ul className={styles.wrapper}>
                {this.renderWeapons()}
                <button onClick={this.handleAddClick} className={styles.add}>
                    Add weapon group
                </button>
            </ul>
        );
    }

    private renderWeapons() {
        const {weapons = []} = this.props;
        const holder = new StateHolder(weapons, (state) => this.actionUpdate(state));

        return weapons.map((weapon, id) => {
            return (
                <li className={styles.weapon} key={id}>
                    <WeaponGroup onChange={holder.onChange(id)} {...weapon} />
                    <button onClick={this.handleRemoveClick(id)} className={styles.remove}>
                        remove
                    </button>
                </li>
            );
        });
    }

    private actionAdd() {
        let {weapons = []} = this.props;
        weapons = weapons.slice();
        weapons.push(WeaponGroup.defaultState);
        this.actionUpdate(weapons);
    }

    private actionRemove(id) {
        let {weapons = []} = this.props;
        weapons = weapons.slice();
        weapons.splice(id, 1);
        this.actionUpdate(weapons);
    }

    private actionUpdate(weapons) {
        this.props.onChange(weapons);
    }

    private handleAddClick = () => this.actionAdd();
    private handleRemoveClick = (id) => () => this.actionRemove(id);
}
