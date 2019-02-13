import * as React from "react";

import {InputWeaponContainer} from "../input-weapon";

const styles = require("./index.pcss");

type WeaponListProps = React.Props<WeaponList> & {
    weapons: string[];
    actionAdd: () => void;
    actionRemove: (id: string) => void;
};

export default class WeaponList extends React.Component<WeaponListProps, null> {
    public render() {
        return (
            <ul className={styles.wrapper}>
                {this.renderWeapons()}
                <button onClick={this.props.actionAdd} className={styles.add}>
                    Add weapon group
                </button>
            </ul>
        );
    }

    private renderWeapons() {
        return this.props.weapons.map((id) => (
            <li className={styles.weapon} key={id}>
                <InputWeaponContainer weaponId={id} />

                <button onClick={() => this.props.actionRemove(id)} className={styles.remove}>
                    remove
                </button>
            </li>
        ));
    }
}
