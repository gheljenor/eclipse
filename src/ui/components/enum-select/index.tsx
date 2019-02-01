import {ChangeEvent} from "react";
import * as React from "react";

const styles = require("./index.pcss");

interface IEnumSelectProps<List, ListKey extends keyof List>
    extends React.Props<EnumSelect<List, ListKey>> {
    options: List;
    value?: ListKey;
    onChange?: (value: ListKey) => void;
}

interface IEnumSelectState<List, ListKey extends keyof List> {
    value?: ListKey;
}

export default class EnumSelect<List, ListKey extends keyof List>
    extends React.Component<IEnumSelectProps<List, ListKey>, IEnumSelectState<List, ListKey>> {
    constructor(props) {
        super(props);
        const {value = Object.keys(props.options)[0]} = props;
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
        return Object.entries(this.props.options).map(([value, title]) => (
            <option value={value} key={value}>{title}</option>
        ));
    }

    private handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value: ListKey = parseInt(event.target.value, 10) as ListKey;

        if (this.state.value === value) {
            return;
        }

        this.setState({value});

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };
}
