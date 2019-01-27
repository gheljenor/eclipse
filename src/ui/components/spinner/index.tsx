import {ChangeEvent, WheelEvent} from "react";
import * as React from "react";

const styles = require("./index.pcss");

interface ISpinnerProps extends React.Props<Spinner> {
    value?: number;
    min?: number;
    max?: number;
    onChange?: (value: number) => void;
}

interface ISpinnerState {
    value: number;
}

export default class Spinner extends React.Component<ISpinnerProps, ISpinnerState> {
    constructor(props) {
        super(props);
        const {min = -Infinity, max = Infinity, value = 0} = props;
        this.state = {value};
    }

    public static getDerivedStateFromProps(props, state) {
        const {min = -Infinity, max = Infinity} = props;
        const {value = 0} = state;
        return {value: Math.max(min, Math.min(max, value))};
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
        const {min = -Infinity, max = Infinity} = this.props;
        value = Math.max(min, Math.min(max, value));

        this.setState({value});

        if (this.props.onChange) {
            this.props.onChange(value);
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
