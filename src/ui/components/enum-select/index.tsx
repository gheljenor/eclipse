import {ChangeEvent} from "react";
import * as React from "react";

const styles = require("./index.pcss");

export default class EnumTypeSelect<Enum> extends React.Component<{
    types?: Enum;
    titles: { [key in Enum]: string };
    value?: Enum;
}, {
    value?: string | number;
}> {
    constructor(props) {
        super(props);
        this.state = {value: props.value};
    }

    public render() {
        const options = [];
        for (const key in this.props.types) {
            if (!this.props.titles[key]) {
                continue;
            }

            options.push(<option value={key} key={key}>{this.props.titles[key]}</option>);
        }

        return (
            <select className={styles.wrapper} value={this.state.value} onChange={this.onChange}>{options}</select>
        );
    }

    private onChange = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({value: event.target.value});
    };
}
