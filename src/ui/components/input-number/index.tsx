import {ChangeEvent, WheelEvent} from "react";
import * as React from "react";

const styles = require("./index.pcss");

interface IInputNumberProps extends React.Props<InputNumber> {
    value: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
}

export default class InputNumber extends React.Component<IInputNumberProps, null> {
    public render() {
        if (this.value !== this.props.value) {
            this.change(this.value);
        }

        return (
            <div className={styles.wrapper} onWheel={this.handleWheel}>
                <input
                    className={styles.input}
                    type="text"
                    value={this.value}
                    onChange={this.handleChange}
                />
                <div className={styles.spinner}>
                    <button className={styles.buttonPlus} onClick={this.handleButtonPlusClick}>+</button>
                    <button className={styles.buttonMinus} onClick={this.handleButtonMinusClick}>-</button>
                </div>
            </div>
        );
    }

    private get value() {
        const {min = -Infinity, max = Infinity, value} = this.props;
        return Math.min(max, Math.max(min, value));
    }

    private increment() {
        return this.change(this.value + 1);
    }

    private decrement() {
        return this.change(this.value - 1);
    }

    private change(nextValue) {
        const {min = -Infinity, max = Infinity} = this.props;
        nextValue = Math.min(max, Math.max(min, nextValue));

        if (this.value !== nextValue) {
            this.props.onChange(nextValue);
        }
    }

    private handleWheel = (event: WheelEvent) => {
        event.preventDefault();

        if (event.deltaY < 0) {
            this.decrement();
        } else {
            this.increment();
        }
    };

    private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        this.change(value);
    };

    private handleButtonPlusClick = () => {
        this.increment();
    };

    private handleButtonMinusClick = () => {
        this.decrement();
    };
}
