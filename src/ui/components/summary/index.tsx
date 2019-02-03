import * as React from "react";
import {shipTypeTitles} from "../ship-blueprint";
import {ISummayProps} from "./i-summary-props";
import {IOutcome, prepareSummary} from "./prepare-summary";

const styles = require("./index.pcss");

export default class Summary extends React.Component<ISummayProps> {
    private static renderDetails(outcomes: IOutcome[]) {
        return outcomes.map(Summary.renderDetail);
    }

    private static renderDetail(outcome: IOutcome) {
        const {probability, ships} = outcome;

        return (
            <li key={probability} className={styles.result}>
                <div className={styles.resultLine} style={{width: (probability * 100).toFixed(2) + "%"}} />
                <div className={styles.resultText}>{(probability * 100).toFixed(1)}%</div>
                <ul className={styles.resultShips}>{ships.map(Summary.renderShip)}</ul>
            </li>
        );
    }

    private static renderShip({type, count}) {
        return <li key={type + ":" + count} className={styles.ship}>{shipTypeTitles[type]} x{count}</li>;
    }

    public render() {
        const {players, results} = this.props;

        const player1 = players[0];
        const player2 = players[1];

        const outcomes = prepareSummary(this.props);

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
                    <ul className={styles.detailsLeft}>{Summary.renderDetails(outcomes[player1])}</ul>
                    <ul className={styles.detailsRight}>{Summary.renderDetails(outcomes[player2])}</ul>
                </div>
            </div>
        );
    }
}
