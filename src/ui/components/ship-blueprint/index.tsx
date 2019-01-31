import * as React from "react";

import {EBattleShipType} from "../../../battle/battleship";
import {IWeapon} from "../../../battle/i-weapon";
import EnumTypeSelect from "../enum-select";
import Spinner from "../spinner";
import WeaponList from "../weapon-list";

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

interface IBlueprintWeapon extends IWeapon {
    count: number;
}

interface IShipBlueprintState {
    count?: number;
    type?: EBattleShipType;
    hp?: number;
    initiative?: number;
    defence?: number;
    attack?: number;
    heal?: number;
    weapons?: IBlueprintWeapon[];
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
                        min={0}
                        max={shipsCount[this.state.type]}
                        value={this.state.count}
                    />
                    <EnumTypeSelect onChange={this.saveState("type")} values={shipTypeTitles} value={this.state.type} />
                </div>

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Hp:</div>
                        <Spinner onChange={this.saveState("hp")} min={0} value={this.state.hp} />
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Initiative:</div>
                        <Spinner onChange={this.saveState("initiative")} min={0} value={this.state.initiative} />
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Defence:</div>
                        <Spinner onChange={this.saveState("defence")} min={0} value={this.state.defence} />
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Attack:</div>
                        <Spinner onChange={this.saveState("attack")} min={0} value={this.state.attack} />
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Heal:</div>
                        <Spinner onChange={this.saveState("heal")} min={0} max={6} value={this.state.heal} />
                    </div>
                </div>

                <WeaponList weapons={this.state.weapons}/>
            </div>
        );
    }
}
