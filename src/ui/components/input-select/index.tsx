import {ChangeEvent} from "react";
import * as React from "react";

const styles = require("./index.pcss");

interface IInputSelectProps<List, ListKey extends keyof List>
    extends React.Props<InputSelect<List, ListKey>> {
    options: List;
    value: ListKey;
    onChange: (value: ListKey) => void;
}

export default class InputSelect<List, ListKey extends keyof List>
    extends React.Component<IInputSelectProps<List, ListKey>, null> {

    public render() {
        const {value} = this.props;

        return (
            <select
                className={styles.wrapper}
                value={value as string}
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
        const nextValue: ListKey = parseInt(event.target.value, 10) as ListKey;

        const {value} = this.props;

        if (value !== nextValue) {
            this.props.onChange(nextValue);
        }
    };
}
