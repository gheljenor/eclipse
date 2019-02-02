import * as React from "react";
import StateHolder from "../../lib/state-holder";
import Player, {IPlayerState} from "../player";

const styles = require("./index.pcss");

interface ISetupState {
    defender: 0 | 1;
    player1: IPlayerState;
    player2: IPlayerState;
}

export default class Setup extends React.Component<{}, ISetupState> {
    constructor(props) {
        super(props);

        this.state = {
            defender: 0,
            player1: Object.assign(Player.defautState, {player: "Player"}),
            player2: Object.assign(Player.defautState, {player: "Enemy"}),
        };
    }

    public render() {
        const holder = new StateHolder(this.state, (newState) => {
            let defender;

            if (this.state.player1 !== newState.player1) {
                defender = newState.player1.defender ? 0 : 1;
            } else {
                defender = newState.player2.defender ? 1 : 0;
            }

            if (newState.defender !== defender) {
                newState = Object.assign({}, newState, {defender});
            }

            this.setState(newState);
        });

        return (
            <div className={styles.wrapper}>
                <div className={styles.players}>
                    <div className={styles.playerContent}>
                        <div className={styles.playerLeft}>
                            <Player
                                {...this.state.player1}
                                defender={this.state.defender === 0}
                                onChange={holder.onChange("player1")}
                            />
                        </div>
                    </div>
                    <div className={styles.playerContent}>
                        <div className={styles.playerRight}>
                            <Player
                                {...this.state.player2}
                                defender={this.state.defender === 1}
                                onChange={holder.onChange("player2")}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
