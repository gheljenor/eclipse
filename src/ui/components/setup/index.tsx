import * as React from "react";
import StateHolder, {IStateHolderAction} from "../../lib/state-holder";
import Player, {IPlayerState} from "../player";

const styles = require("./index.pcss");

export interface ISetupState {
    defender: 0 | 1;
    player1: IPlayerState;
    player2: IPlayerState;
}

interface ISetupProps extends React.Props<Setup>, Partial<ISetupState> {
    onChange: IStateHolderAction<ISetupState>;
}

export default class Setup extends React.Component<ISetupProps, null> {
    public static get defaultPlayer1() {
        return Object.assign(Player.defautState, {player: "Player"});
    }

    public static get defaultPlayer2() {
        return Object.assign(Player.defautState, {player: "Enemy"});
    }

    public static get defaultState() {
        return {
            defender: 1,
            player1: Setup.defaultPlayer1,
            player2: Setup.defaultPlayer2,
        };
    }

    public render() {
        const {
            defender = 1,
            player1 = Setup.defaultPlayer1,
            player2 = Setup.defaultPlayer2,
        } = this.props;

        const state = {defender, player1, player2};

        const holder = new StateHolder(state, (newState) => {
            let newDefender;

            if (state.player1 !== newState.player1) {
                newDefender = newState.player1.defender ? 0 : 1;
            } else {
                newDefender = newState.player2.defender ? 1 : 0;
            }

            if (defender !== newDefender) {
                newState = Object.assign({}, newState, {defender: newDefender});
            }

            this.props.onChange(newState);
        });

        return (
            <div className={styles.wrapper}>
                <div className={styles.players}>
                    <div className={styles.playerContent}>
                        <div className={styles.playerLeft}>
                            <Player
                                {...player1}
                                defender={defender === 0}
                                onChange={holder.onChange("player1")}
                            />
                        </div>
                    </div>
                    <div className={styles.playerContent}>
                        <div className={styles.playerRight}>
                            <Player
                                {...player2}
                                defender={defender === 1}
                                onChange={holder.onChange("player2")}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
