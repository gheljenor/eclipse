import * as React from "react";

import {EBattleShipType} from "../../../battle/battleship";
import EnumSelect from "../enum-select";
import Spinner from "../spinner";
import WeaponList, {IWeaponListItem} from "../weapon-list";

const styles = require("./index.pcss");

const shipTypeTitles: { [key in EBattleShipType]: string } = {
    [EBattleShipType.interceptor]: "Interceptor",
    [EBattleShipType.cruiser]: "Cruiser",
    [EBattleShipType.dreadnought]: "Dreadnought",
    [EBattleShipType.deathmoon]: "Deathmoon",
    [EBattleShipType.starbase]: "Starbase",
};

const shipsCount: { [key in EBattleShipType]: number } = {
    [EBattleShipType.interceptor]: 8,
    [EBattleShipType.cruiser]: 4,
    [EBattleShipType.dreadnought]: 2,
    [EBattleShipType.deathmoon]: 4,
    [EBattleShipType.starbase]: 4,
};

interface IShipBlueprintState {
    count?: number;
    type?: EBattleShipType;
    hp?: number;
    initiative?: number;
    defence?: number;
    attack?: number;
    heal?: number;
    weapons?: IWeaponListItem[];
}

interface IShipBlueprintProps extends React.Props<ShipBlueprint>, IShipBlueprintState {
    onChange?: (value: IShipBlueprintState) => void;
}

export default class ShipBlueprint extends React.Component<IShipBlueprintProps, IShipBlueprintState> {
    constructor(props) {
        super(props);
        const {
            count = 0,
            type = EBattleShipType.interceptor,
            hp = 1,
            initiative = 0,
            defence = 0,
            attack = 0,
            heal = 0,
            weapons = [],
        }: IShipBlueprintState = props;

        this.state = {count, type, hp, initiative, defence, attack, heal, weapons};
    }

    public saveState = (field: keyof IShipBlueprintState) => (value) => {
        const state = Object.assign({}, this.state, {[field]: value});
        this.setState(state);

        if (this.props.onChange) {
            this.props.onChange(state);
        }
    };

    public render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.head}>
                    <Spinner
                        onChange={this.saveState("count")}
                        value={this.state.count}
                        min={0}
                        max={shipsCount[this.state.type]}
                    />

                    <EnumSelect
                        onChange={this.saveState("type")}
                        value={this.state.type}
                        options={shipTypeTitles}
                    />
                </div>

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Hp:</div>
                        <Spinner
                            onChange={this.saveState("hp")}
                            value={this.state.hp}
                            min={0}
                        />
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Initiative:</div>
                        <Spinner
                            onChange={this.saveState("initiative")}
                            value={this.state.initiative}
                            min={0}
                        />
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Defence:</div>
                        <Spinner
                            onChange={this.saveState("defence")}
                            value={this.state.defence}
                            min={0}
                        />
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Attack:</div>
                        <Spinner
                            onChange={this.saveState("attack")}
                            value={this.state.attack}
                            min={0}
                        />
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Heal:</div>
                        <Spinner
                            onChange={this.saveState("heal")}
                            value={this.state.heal}
                            min={0}
                            max={6}
                        />
                    </div>
                </div>

                <WeaponList
                    onChange={this.saveState("weapons")}
                    weapons={this.state.weapons}
                />
            </div>
        );
    }
}
