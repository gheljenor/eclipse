import * as React from "react";

import {Outcome} from "../../lib/prepare-summary";
import {shipTypeTitles} from "../ship/component";

const styles = require("./index.pcss");

export type SummaryState = {
    results: { [player: string]: number };
    outcomes: { [player: string]: Outcome[] };
};

type SummaryProps = React.Props<Summary> & SummaryState;

export default class Summary extends React.Component<SummaryProps> {
    private static renderDetails(outcome: Outcome) {
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
        const {results, outcomes} = this.props;

        return (
            <div className={styles.wrapper}>
                <div className={styles.results}>
                    <div className={styles.resultsLeft} style={{width: (results.first * 100).toFixed(3) + "%"}} />
                    <div className={styles.resultsRight} style={{width: (results.second * 100).toFixed(3) + "%"}} />
                    <div className={styles.resultsText}>
                        {(results.first * 100).toFixed(1)}% / {(results.second * 100).toFixed(1)}%
                    </div>
                </div>

                <div className={styles.details}>
                    <ul className={styles.detailsLeft}>{outcomes.first.map(Summary.renderDetails)}</ul>
                    <ul className={styles.detailsRight}>{outcomes.second.map(Summary.renderDetails)}</ul>
                </div>
            </div>
        );
    }
}
