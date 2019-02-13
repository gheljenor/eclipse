import {ChangeEvent} from "react";
import * as React from "react";

const styles = require("./index.pcss");

type InputTextProps = {
    value: string;
    onChange: (value: string) => void;
};

export default class InputText extends React.Component<InputTextProps> {
    public render() {
        return (
            <div className={styles.wrapper}>
                <input
                    className={styles.input}
                    type="text"
                    value={this.props.value || ""}
                    onChange={this.handleChange}
                />
            </div>
        );
    }

    private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        this.props.onChange(value);
    };
}
