import {ChangeEvent, WheelEvent} from "react";
import * as React from "react";

const styles = require("./index.pcss");

interface ISpinnerProps extends React.Props<Spinner> {
    value?: number;
    min?: number;
    max?: number;
}

interface ISpinnerState {
    value: number;
}

export default class Spinner extends React.Component<ISpinnerProps, ISpinnerState> {
    private readonly min: number;
    private readonly max: number;

    constructor(props) {
        super(props);
        const {value = 0, min = -Infinity, max = Infinity} = props;

        this.min = min;
        this.max = max;

        this.state = {value};
    }

    public render() {
        return (
            <div className={styles.wrapper} onWheel={this.onWheel}>
                <input className={styles.input} type="text" value={this.state.value} onChange={this.onChange} />

                <div className={styles.spinner}>
                    <button className={styles.buttonUp} onClick={this.onButtonUp}>+</button>
                    <button className={styles.buttonDown} onClick={this.onButtonDown}>-</button>
                </div>
            </div>
        );
    }

    private setValue = (value) => {
        value = Math.max(this.min, Math.min(this.max, value));

        if (this.state.value !== value) {
            this.setState({value});
        }
    };

    private onWheel = (event: WheelEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.setValue(this.state.value + (event.deltaY > 0 ? 1 : -1));
    };

    private onChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setValue(event.target.value);
    };

    private onButtonUp = () => {
        this.setValue(this.state.value + 1);
    };

    private onButtonDown = () => {
        this.setValue(this.state.value - 1);
    };
}
