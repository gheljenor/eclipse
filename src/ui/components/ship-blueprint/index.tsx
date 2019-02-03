import * as React from "react";

import {EBattleShipType} from "../../../battle/battleship";

import EnumSelect from "../enum-select";
import NumberInput from "../number-input";
import WeaponGroup, {IWeaponGroupState} from "../weapon-group";
import WeaponList from "../weapon-list";

import StateHolder, {IStateHolderAction} from "../../lib/state-holder";

const styles = require("./index.pcss");

export const shipTypeTitles: { [key in EBattleShipType]: string } = {
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

export interface IShipBlueprintState {
    count: number;
    type: EBattleShipType;
    hp: number;
    initiative: number;
    defence: number;
    attack: number;
    heal: number;
    weapons: IWeaponGroupState[];
}

interface IShipBlueprintProps extends React.Props<ShipBlueprint>, Partial<IShipBlueprintState> {
    onChange: IStateHolderAction<IShipBlueprintState>;
}

const DEFAULT_COUNT = 1;
const DEFAULT_TYPE = EBattleShipType.interceptor;
const DEFAULT_HP = 1;
const DEFAULT_INITIATIVE = 0;
const DEFAULT_DEFENCE = 0;
const DEFAULT_ATTACK = 0;
const DEFAULT_HEAL = 0;

export default class ShipBlueprint extends React.Component<IShipBlueprintProps, null> {
    public render() {
        const {
            count = DEFAULT_COUNT,
            type = DEFAULT_TYPE,
            hp = DEFAULT_HP,
            initiative = DEFAULT_INITIATIVE,
            defence = DEFAULT_DEFENCE,
            attack = DEFAULT_ATTACK,
            heal = DEFAULT_HEAL,
            weapons = [WeaponGroup.defaultState],
        } = this.props;

        const props = {count, type, hp, initiative, defence, attack, heal, weapons};
        const holder = new StateHolder(props, (newState) => this.props.onChange(newState));

        return (
            <div className={styles.wrapper}>
                <div className={styles.head}>
                    <NumberInput
                        onChange={holder.onChange("count")}
                        state={count}
                        min={1}
                        max={shipsCount[type]}
                    />

                    <EnumSelect
                        onChange={holder.onChange("type")}
                        state={type}
                        options={shipTypeTitles}
                    />
                </div>

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Hp:</div>
                        <NumberInput
                            onChange={holder.onChange("hp")}
                            state={hp}
                            min={1}
                        />
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Initiative:</div>
                        <NumberInput
                            onChange={holder.onChange("initiative")}
                            state={initiative}
                        />
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Defence:</div>
                        <NumberInput
                            onChange={holder.onChange("defence")}
                            state={defence}
                            min={0}
                        />
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Attack:</div>
                        <NumberInput
                            onChange={holder.onChange("attack")}
                            state={attack}
                            min={0}
                        />
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Heal:</div>
                        <NumberInput
                            onChange={holder.onChange("heal")}
                            state={heal}
                            min={0}
                            max={6}
                        />
                    </div>
                </div>

                <WeaponList
                    onChange={holder.onChange("weapons")}
                    weapons={weapons}
                />
            </div>
        );
    }

    public static get defaultState(): IShipBlueprintState {
        return {
            count: DEFAULT_COUNT,
            type: DEFAULT_TYPE,
            hp: DEFAULT_HP,
            initiative: DEFAULT_INITIATIVE,
            defence: DEFAULT_DEFENCE,
            attack: DEFAULT_ATTACK,
            heal: DEFAULT_HEAL,
            weapons: [WeaponGroup.defaultState],
        };
    }
}
