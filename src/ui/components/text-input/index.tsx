import {ChangeEvent} from "react";
import * as React from "react";

import {IStateHolderAction} from "../../lib/state-holder";

const styles = require("./index.pcss");
import "../../lib/index.pcss";

interface ITextInputProps {
    state?: string;
    onChange: IStateHolderAction<string>;
}

export default class TextInput extends React.Component<ITextInputProps> {
    public render() {
        return (
            <div className={styles.wrapper}>
                <input
                    className={styles.input}
                    type={"text"}
                    value={this.props.state || ""}
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
