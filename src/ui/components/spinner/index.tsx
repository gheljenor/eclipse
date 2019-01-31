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
        const {value = 0} = props;
        this.state = {value};
    }

    public static getDerivedStateFromProps(props, state) {
        const {min = -Infinity, max = Infinity} = props;
        const {value: _value = 0} = state;

        const value = Math.max(min, Math.min(max, _value));

        if (state.value === value) {
            return state;
        }

        return {value};
    }

    public render() {
        return (
            <div className={styles.wrapper} onWheel={this.handleWheel}>
                <input className={styles.input} type="text" value={this.state.value} onChange={this.handleChange} />
                <div className={styles.spinner}>
                    <button className={styles.buttonPlus} onClick={this.handleButtonPlusClick}>+</button>
                    <button className={styles.buttonMinus} onClick={this.handleButtonMinusClick}>-</button>
                </div>
            </div>
        );
    }

    private update = (value: number) => {
        const {min = -Infinity, max = Infinity} = this.props;
        value = Math.max(min, Math.min(max, value));

        if (this.state.value === value) {
            return;
        }

        this.setState({value});

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };

    private handleWheel = (event: WheelEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.update(this.state.value + (event.deltaY > 0 ? 1 : -1));
    };

    private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.update(+event.target.value);
    };

    private handleButtonPlusClick = () => {
        this.update(this.state.value + 1);
    };

    private handleButtonMinusClick = () => {
        this.update(this.state.value - 1);
    };
}
