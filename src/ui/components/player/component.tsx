import * as React from "react";

import InputCheckbox from "../input-checkbox";
import InputText from "../input-text";
import {ShipListContainer} from "../ship-list";

const styles = require("./index.pcss");

export interface IPlayerState {
    defender: boolean;
    name: string;
}

interface IPlayerProps extends React.Props<Player>, IPlayerState {
    playerId: string;
    actionUpdate: (value: Partial<IPlayerState>) => void;
}

export default class Player extends React.Component<IPlayerProps, null> {
    public render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.head}>
                    <div className={styles.headLeft}>
                        <div className={styles.title}>Name:</div>
                        <InputText {...this.prop("name")} />
                    </div>

                    <div className={styles.headRight}>
                        <div className={styles.title}>Defender:</div>
                        <InputCheckbox {...this.prop("defender")} />
                    </div>
                </div>

                <ShipListContainer playerId={this.props.playerId} />
            </div>
        );
    }

    private prop<Field extends keyof IPlayerState>(field: Field) {
        return {
            value: this.props[field],
            onChange: this.handleChange(field),
        };
    }

    private handleChange = <Field extends keyof IPlayerState>(field: Field) => (value: IPlayerState[Field]) => {
        this.props.actionUpdate({[field]: value});
    };
}
