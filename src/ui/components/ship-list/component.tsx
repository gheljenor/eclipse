import * as React from "react";

import {ShipContainer} from "../ship";

const styles = require("./index.pcss");

type ShipListProps = React.Props<ShipList> & {
    ships: number[];
    actionAdd: () => void;
    actionRemove: (weaponId: number) => void;
};

export default class ShipList extends React.Component<ShipListProps, null> {
    public render() {
        return (
            <ul className={styles.wrapper}>
                <button className={styles.add} onClick={this.props.actionAdd}>Add Ships Group</button>
                {this.renderShips()}
            </ul>
        );
    }

    private renderShips() {
        return this.props.ships.map((idx) => (
            <li key={idx} className={styles.ship}>
                <button className={styles.remove} onClick={() => this.props.actionRemove(idx)}>Remove</button>
                <ShipContainer shipId={idx} />
            </li>
        ));
    }
}
