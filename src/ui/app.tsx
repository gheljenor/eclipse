import * as React from "react";

import {battleSummary, IBattleSummary} from "../battle/select/battle-summary";
import {simulateBattle} from "../battle/sim/simulate-battle";
import Checkbox from "./components/checkbox";

import Setup, {ISetupState} from "./components/setup";
import {setupToBattlescene} from "./components/setup/setup-to-battlescene";
import Summary from "./components/summary";

const styles = require("./index.pcss");

interface IAppState {
    setup: ISetupState;
    autosim?: boolean;
    summary?: IBattleSummary;
    duration?: number;
}

const TROTTLE = 500;

export default class App extends React.Component<Partial<IAppState>, IAppState> {
    private trottle;

    constructor(props) {
        super(props);
        const {setup = Setup.defaultState} = props;
        this.state = {setup};
    }

    public render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.controls}>
                    <button className={styles.simulate} onClick={this.showSummary}>Simulate</button>

                    {this.renderDuration()}

                    <div className={styles.autosim}>
                        <div className={styles.autosimTitle}>Auto-simulate:</div>
                        <Checkbox state={this.state.autosim} onChange={this.handleAutosimChange} />
                    </div>
                </div>

                <div className={styles.summary}>
                    {this.state.summary && this.renderSummary()}
                </div>

                <div className={styles.setup}>
                    <Setup {...this.state.setup} onChange={this.handleSetupChange} />
                </div>
            </div>
        );
    }

    private renderDuration() {
        if (!this.state.duration) {
            return;
        }
        return (
            <div className={styles.duration}>
                Simulated in: {(this.state.duration / 1000).toFixed(1)}sec.
            </div>
        );
    }

    private renderSummary() {
        return (
            <Summary
                players={[this.state.setup.player1.player, this.state.setup.player2.player]}
                {...this.state.summary}
            />
        );
    }

    private handleSetupChange = (setup: ISetupState) => {
        this.setState({setup});

        if (this.state.autosim) {
            this.autoSim();
        }
    };

    private handleAutosimChange = (autosim) => {
        this.setState({autosim});

        if (autosim) {
            this.autoSim();
        } else if (this.trottle) {
            this.trottle = clearTimeout(this.trottle);
        }
    };

    private autoSim() {
        if (this.trottle) {
            clearTimeout(this.trottle);
        }

        this.trottle = setTimeout(() => {
            this.trottle = null;
            this.showSummary();
        }, TROTTLE);
    }

    private showSummary = () => {
        const start = Date.now();
        const battleScene = setupToBattlescene(this.state.setup);
        const simulation = simulateBattle(battleScene);
        const summary = battleSummary(simulation);
        const duration = Date.now() - start;
        this.setState({summary, duration});
    };
}
