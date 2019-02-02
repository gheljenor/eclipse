import {ChangeEvent} from "react";
import * as React from "react";

import {IStateHolderAction} from "../../lib/state-holder";

const styles = require("./index.pcss");

interface IEnumSelectProps<List, ListKey extends keyof List>
    extends React.Props<EnumSelect<List, ListKey>> {
    options: List;
    state?: ListKey;
    onChange?: IStateHolderAction<ListKey>;
}

export default class EnumSelect<List, ListKey extends keyof List>
    extends React.Component<IEnumSelectProps<List, ListKey>, null> {

    public render() {
        const {state = this.defaultValue} = this.props;

        return (
            <select
                className={styles.wrapper}
                value={state as string}
                onChange={this.handleChange}
            >
                {this.renderOptions()}
            </select>
        );
    }

    private get defaultValue() {
        return Object.keys(this.props.options)[0];
    }

    private renderOptions() {
        return Object.entries(this.props.options).map(([value, title]) => (
            <option value={value} key={value}>{title}</option>
        ));
    }

    private actionChange(value) {
        const {state = this.defaultValue} = this.props;
        if (state !== value) {
            this.props.onChange(value);
        }
    }

    private handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value: ListKey = parseInt(event.target.value, 10) as ListKey;
        this.actionChange(value);
    };
}
