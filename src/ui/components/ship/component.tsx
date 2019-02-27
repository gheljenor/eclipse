import * as React from "react";

import InputNumber from "../input-number";
import InputSelect from "../input-select";
import {WeaponListContainer} from "../weapon-list";

import {BattleShipType} from "../../../battle/data/battle-ship";

const styles = require("./index.pcss");

export const shipTypeTitles: { [key in BattleShipType]: string } = {
    [BattleShipType.interceptor]: "Interceptor",
    [BattleShipType.cruiser]: "Cruiser",
    [BattleShipType.dreadnought]: "Dreadnought",
    [BattleShipType.deathmoon]: "Deathmoon",
    [BattleShipType.starbase]: "Starbase",
};

const shipsCount: { [key in BattleShipType]: number } = {
    [BattleShipType.interceptor]: 8,
    [BattleShipType.cruiser]: 4,
    [BattleShipType.dreadnought]: 2,
    [BattleShipType.deathmoon]: 4,
    [BattleShipType.starbase]: 4,
};

export type ShipState = {
    count: number;
    type: BattleShipType;
    hp: number;
    initiative: number;
    defence: number;
    attack: number;
    heal: number;
};

export type ShipProps = React.Props<Ship> & ShipState & {
    actionUpdate: (value: Partial<ShipState>) => void;
    shipId: number;
};

const DEFAULT_COUNT = 1;
const DEFAULT_TYPE = BattleShipType.interceptor;
const DEFAULT_HP = 1;
const DEFAULT_INITIATIVE = 0;
const DEFAULT_DEFENCE = 0;
const DEFAULT_ATTACK = 0;
const DEFAULT_HEAL = 0;

export default class Ship extends React.Component<ShipProps, null> {
    public render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.head}>
                    <InputNumber {...this.prop("count")} min={1} max={shipsCount[this.props.type]} />
                    <InputSelect {...this.prop("type")} options={shipTypeTitles} />
                </div>

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Hp:</div>
                        <InputNumber {...this.prop("hp")} min={1} />
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Initiative:</div>
                        <InputNumber {...this.prop("initiative")} />
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Defence:</div>
                        <InputNumber {...this.prop("defence")} min={0} />
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Attack:</div>
                        <InputNumber {...this.prop("attack")} min={0} />
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Heal:</div>
                        <InputNumber {...this.prop("heal")} min={0} max={1} />
                    </div>
                </div>

                <WeaponListContainer shipId={this.props.shipId} />
            </div>
        );
    }

    private prop<Field extends keyof ShipState>(field: Field) {
        return {
            value: this.props[field],
            onChange: this.handleChange(field),
        };
    }

    private handleChange = <Field extends keyof ShipState>(field: Field) => (value: ShipState[Field]) => {
        this.props.actionUpdate({[field]: value});
    };

    public static get defaultState(): ShipState {
        return {
            count: DEFAULT_COUNT,
            type: DEFAULT_TYPE,
            hp: DEFAULT_HP,
            initiative: DEFAULT_INITIATIVE,
            defence: DEFAULT_DEFENCE,
            attack: DEFAULT_ATTACK,
            heal: DEFAULT_HEAL,
        };
    }
}
