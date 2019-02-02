import {ChangeEvent, WheelEvent} from "react";
import * as React from "react";

import {IStateHolderAction} from "../../lib/state-holder";

const styles = require("./index.pcss");
import "../../lib/index.pcss";

interface ISpinnerProps extends React.Props<NumberInput> {
    state?: number;
    min?: number;
    max?: number;
    onChange: IStateHolderAction<number>;
}

const DEFAULT_VALUE = 0;

export default class NumberInput extends React.Component<ISpinnerProps, null> {
    public render() {
        const {min = -Infinity, max = Infinity, state = DEFAULT_VALUE} = this.props;
        const value = Math.min(max, Math.max(min, state));

        if (value !== state) {
            this.actionChange(value);
        }

        return (
            <div className={styles.wrapper} onWheel={this.handleWheel}>
                <input className={styles.input} type="text" value={value} onChange={this.handleChange} />
                <div className={styles.spinner}>
                    <button className={styles.buttonPlus} onClick={this.handleButtonPlusClick}>+</button>
                    <button className={styles.buttonMinus} onClick={this.handleButtonMinusClick}>-</button>
                </div>
            </div>
        );
    }

    private actionIncrement() {
        const {state = DEFAULT_VALUE} = this.props;
        return this.actionChange(state + 1);
    }

    private actionDecrement() {
        const {state = DEFAULT_VALUE} = this.props;
        return this.actionChange(state - 1);
    }

    private actionChange(newValue) {
        const {min = -Infinity, max = Infinity, state = DEFAULT_VALUE} = this.props;
        newValue = Math.min(max, Math.max(min, newValue));

        if (state !== newValue) {
            this.props.onChange(newValue);
        }
    }

    private handleWheel = (event: WheelEvent) => {
        event.preventDefault();

        if (event.deltaY > 0) {
            this.actionDecrement();
        } else {
            this.actionIncrement();
        }
    };

    private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        this.actionChange(value);
    };

    private handleButtonPlusClick = () => {
        this.actionIncrement();
    };

    private handleButtonMinusClick = () => {
        this.actionDecrement();
    };
}
