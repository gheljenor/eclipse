import * as React from "react";

import StateHolder, {IStateHolderAction} from "../../lib/state-holder";
import Checkbox from "../checkbox";

import ShipBlueprint, {IShipBlueprintState} from "../ship-blueprint";
import ShipList from "../ship-list";

const styles = require("./index.pcss");
import "../../lib/index.pcss";
import TextInput from "../text-input";

export interface IPlayerState {
    defender?: boolean;
    player: string;
    ships: IShipBlueprintState[];
}

interface IPlayerProps extends React.Props<Player>, Partial<IPlayerState> {
    onChange: IStateHolderAction<IPlayerState>;
}

const DEFAULT_NAME = "player";

export default class Player extends React.Component<IPlayerProps, null> {
    public render() {
        const {
            defender = false,
            player = DEFAULT_NAME,
            ships = [ShipBlueprint.defaultState],
        } = this.props;

        const state = {defender, player, ships};
        const holder = new StateHolder(state, (newState) => this.props.onChange(newState));

        return (
            <div className={styles.wrapper}>
                <div className={styles.head}>
                    <div className={styles.headLeft}>
                        <div className={styles.title}>Player name:</div>
                        <TextInput state={player} onChange={holder.onChange("player")} />
                    </div>

                    <div className={styles.headRight}>
                        <div className={styles.title}>Defender:</div>
                        <Checkbox state={defender} onChange={holder.onChange("defender")} />
                    </div>
                </div>
                <ShipList ships={ships} onChange={holder.onChange("ships")} />
            </div>
        );
    }

    public static get defautState(): IPlayerState {
        return {
            player: DEFAULT_NAME,
            ships: [ShipBlueprint.defaultState],
        };
    }
}
