import {ChangeEvent} from "react";
import * as React from "react";

const styles = require("./index.pcss");

export default class EnumTypeSelect<List, Keys extends keyof List> extends React.Component<{
    values: List;
    value?: Keys;
    onChange?: (value: Keys) => void
}, {
    value?: Keys;
}> {
    constructor(props) {
        super(props);
        this.state = {value: props.value};
    }

    public render() {
        const options = [];
        for (const key in this.props.values) {
            options.push(<option value={key} key={key}>{this.props.values[key]}</option>);
        }

        return (
            <select className={styles.wrapper} value={this.state.value as string} onChange={this.onChange}>
                {options}
            </select>
        );
    }

    private onChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value: Keys = event.target.value as Keys;

        this.setState({value});

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };
}
