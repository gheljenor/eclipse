import * as React from "react";

import {IBattleSummary} from "../../../battle/select/battle-summary";
import {IBattleScene} from "../../../battle/sim/i-battle-scene";
import {shipTypeTitles} from "../ship-blueprint";

const styles = require("./index.pcss");

export default class Summary extends React.Component<IBattleSummary> {
    private static renderDetail(scene: IBattleScene, probability: number) {
        const player = scene.winner as string;
        const ships = scene.ships.filter((ship) => ship.hp > 0 && ship.owner === player);

        const shipsByType = {};

        ships.forEach((ship) => {
            shipsByType[ship.type] = shipsByType[ship.type] || 0;
            shipsByType[ship.type]++;
        });

        return (
            <li key={player + probability} className={styles.result}>
                <div className={styles.resultLine} style={{width: (probability * 100).toFixed(2) + "%"}} />
                <div className={styles.resultText}>{(probability * 100).toFixed(1)}%</div>
                <ul className={styles.resultShips}>{Object.entries(shipsByType).map(Summary.renderShip)}</ul>
            </li>
        );
    }

    private static renderShip([shipType, count]) {
        return <li key={shipType + count} className={styles.ship}>{shipTypeTitles[shipType]} x{count}</li>;
    }

    public render() {
        const {results} = this.props;

        const players = Object.keys(results);

        const player1 = players[0];
        const player2 = players[1];

        return (
            <div className={styles.wrapper}>
                <div className={styles.results}>
                    <div className={styles.resultsLeft} style={{width: (results[player1] * 100).toFixed(3) + "%"}} />
                    <div className={styles.resultsRight} style={{width: (results[player2] * 100).toFixed(3) + "%"}} />
                    <div className={styles.resultsText}>
                        {(results[player1] * 100).toFixed(1)}% / {(results[player2] * 100).toFixed(1)}%
                    </div>
                </div>

                <div className={styles.details}>
                    <ul className={styles.detailsLeft}>{this.renderDetails(player1)}</ul>
                    <ul className={styles.detailsRight}>{this.renderDetails(player2)}</ul>
                </div>
            </div>
        );
    }

    private renderDetails(player) {
        return Array.from(this.props.scenes)
            .filter(([scene]) => scene.winner === player)
            .map(([scene, probability]) => Summary.renderDetail(scene, probability));
    }
}
