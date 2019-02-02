import * as React from "react";
import StateHolder, {IStateHolderAction} from "../../lib/state-holder";
import ShipBlueprint, {IShipBlueprintState} from "../ship-blueprint";

const styles = require("./index.pcss");
import "../../lib/index.pcss";

interface IShipListProps extends React.Props<ShipList> {
    ships?: Array<Partial<IShipBlueprintState>>;
    onChange: IStateHolderAction<IShipBlueprintState[]>;
}

export default class ShipList extends React.Component<IShipListProps, null> {
    public render() {
        return (
            <ul className={styles.wrapper}>
                <button className={styles.add} onClick={this.handleAddClick}>Add Ships Group</button>
                {this.renderShips()}
            </ul>
        );
    }

    private renderShips() {
        const {ships = []} = this.props;
        const holder = new StateHolder(ships, (state) => this.actionChange(state));

        return ships.map((ship, idx) => {
            return (
                <li key={idx} className={styles.ship}>
                    <button className={styles.remove} onClick={this.handleRemoveClick(idx)}>Remove</button>
                    <ShipBlueprint {...ship} onChange={holder.onChange(idx)} />
                </li>
            );
        });
    }

    private actionAdd() {
        let {ships = []} = this.props;
        ships = ships.slice();
        ships.push(ShipBlueprint.defaultState);
        this.actionChange(ships);
    }

    private actionRemove(id) {
        let {ships = []} = this.props;
        ships = ships.slice();
        ships.splice(id, 1);
        this.actionChange(ships);
    }

    private actionChange(ships) {
        if (this.props.ships !== ships) {
            this.props.onChange(ships);
        }
    }

    private handleAddClick = () => this.actionAdd();
    private handleRemoveClick = (id) => () => this.actionRemove(id);
}
