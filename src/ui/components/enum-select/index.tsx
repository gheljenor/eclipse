import {ChangeEvent} from "react";
import * as React from "react";

const styles = require("./index.pcss");

export default class EnumTypeSelect<List, ListKey extends keyof List> extends React.Component<{
    values: List;
    value?: ListKey;
    onChange?: (value: ListKey) => void
}, {
    value?: ListKey;
}> {
    constructor(props) {
        super(props);
        const {value = Object.keys(props.values)[0]} = props;
        this.state = {value};
    }

    public render() {
        return (
            <select
                className={styles.wrapper}
                value={this.state.value as string}
                onChange={this.handleChange}
            >
                {this.renderOptions()}
            </select>
        );
    }

    private renderOptions() {
        return Object.entries(this.props.values).map(([value, title]) => (
            <option value={value} key={value}>{title}</option>
        ));
    }

    private handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value: ListKey = event.target.value as ListKey;

        if (this.state.value === value) {
            return;
        }

        this.setState({value});

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };
}
