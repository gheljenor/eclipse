import * as React from "react";

import InputCheckbox from "../components/input-checkbox";
import Setup from "../components/setup";
import {SummaryContainer} from "../components/summary";
import {SummaryStatus} from "../components/summary/component";
import {AppState} from "../reducers/app";

const styles = require("./index.pcss");

type AppProps = React.Props<App> & AppState & SummaryStatus & {
    actionSimulate: () => void;
    actionAutosim: () => void;
};

export default class App extends React.Component<AppProps> {
    public render() {
        const summaryState = this.props.state;

        const summaryStyle = summaryState === "ready" ? styles.summaryReady
            : summaryState === "empty" ? styles.summaryEmpty
                : styles.summaryPending;

        return (
            <div className={styles.wrapper}>
                <div className={styles.controls}>
                    <button className={styles.simulate} onClick={this.props.actionSimulate}>Simulate</button>

                    {this.renderDuration()}

                    <div className={styles.autosim}>
                        <div className={styles.autosimTitle}>Auto-simulate:</div>
                        <InputCheckbox value={this.props.autosim} onChange={this.props.actionAutosim} />
                    </div>
                </div>

                <div className={[styles.summary, summaryStyle].join(" ")}>
                    {summaryState === "ready" && <SummaryContainer />}
                </div>

                <div className={styles.setup}>
                    <Setup />
                </div>
            </div>
        );
    }

    private renderDuration() {
        if (!this.props.duration) {
            return;
        }

        return (
            <div className={styles.duration}>
                Simulated in: {(this.props.duration / 1000).toFixed(1)}sec.
            </div>
        );
    }
}
