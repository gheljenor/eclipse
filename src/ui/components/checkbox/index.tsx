import * as React from "react";
import {IStateHolderAction} from "../../lib/state-holder";

const styles = require("./index.pcss");

interface ICheckboxProps {
    state?: boolean;
    onChange: IStateHolderAction<boolean>;
}

let counter = 0;

export default class Checkbox extends React.Component<ICheckboxProps> {
    private readonly id: number;

    constructor(props) {
        super(props);
        this.id = counter++;
    }

    public render() {
        return (
            <div className={styles.wrapper}>
                <input
                    className={styles.input}
                    type="checkbox"
                    id={"checkbox-" + this.id}
                    checked={this.props.state || false}
                    onChange={this.handleChange}
                />
                <label htmlFor={"checkbox-" + this.id} className={styles.label} />
            </div>
        );
    }

    private handleChange = (event) => {
        const checked: boolean = !!event.target.checked;
        this.props.onChange(checked);
    };
}
