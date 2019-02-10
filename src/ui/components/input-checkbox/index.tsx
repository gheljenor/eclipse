import * as React from "react";

const styles = require("./index.pcss");

interface IInputCheckboxProps {
    value: boolean;
    onChange: (value: boolean) => void;
}

let counter = 0;

export default class InputCheckbox extends React.Component<IInputCheckboxProps> {
    private readonly id: string;

    constructor(props) {
        super(props);
        this.id = "checkbox-" + counter++;
    }

    public render() {
        return (
            <div className={styles.wrapper}>
                <input
                    className={styles.input}
                    type="checkbox"
                    id={this.id}
                    checked={this.props.value || false}
                    onChange={this.handleChange}
                />
                <label htmlFor={this.id} className={styles.label} />
            </div>
        );
    }

    private handleChange = (event) => {
        const checked: boolean = !!event.target.checked;
        this.props.onChange(checked);
    };
}
