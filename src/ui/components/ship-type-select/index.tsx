import {ChangeEvent} from "react";
import * as React from "react";
import {EBattleShipType} from "../../../battle/battleship";
import Spinner from "../spinner";

const styles = require("./index.pcss");

interface IShipTypeSelectProps extends React.Props<Spinner> {
    type?: EBattleShipType;
}

interface IShipTypeSelectState {
    type: EBattleShipType | null;
}

const titles: { [type in EBattleShipType]: string } = {
    [EBattleShipType.interceptor]: "Interceptor",
    [EBattleShipType.cruiser]: "Cruiser",
    [EBattleShipType.dreadnought]: "Dreadnought",
    [EBattleShipType.starbase]: "Starbase",
    [EBattleShipType.deathmoon]: "Deathmoon",
};

export default class ShipTypeSelect extends React.Component<IShipTypeSelectProps, IShipTypeSelectState> {
    constructor(props) {
        super(props);
        this.state = {type: props.type};
    }

    public render() {
        const options = [];
        for (const key in EBattleShipType) {
            if (!titles[key]) {
                continue;
            }
            options.push(<option value={key} key={key}>{titles[key]}</option>);
        }

        return (
            <select className={styles.wrapper} value={this.state.type} onChange={this.onChange}>{options}</select>
        );
    }

    private onChange = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({type: event.target.value as unknown as EBattleShipType});
    };
}
