import * as React from "react";

import {PlayerContainer} from "../player";

const styles = require("./index.pcss");

export default class Setup extends React.Component {
    public render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.players}>
                    <div className={styles.playerContent}>
                        <div className={styles.playerLeft}>
                            <PlayerContainer playerId="first" />
                        </div>
                    </div>
                    <div className={styles.playerContent}>
                        <div className={styles.playerRight}>
                            <PlayerContainer playerId="second" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
