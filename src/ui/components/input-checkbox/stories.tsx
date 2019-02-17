/* tslint:disable:jsx-alignment */

import * as React from "react";

import {State, Store} from "@sambego/storybook-state";
import {action} from "@storybook/addon-actions";
import {storiesOf} from "@storybook/react";

import InputCheckbox from "./index";

const onChange = action("onChange");

storiesOf("InputCheckbox", module)
    .add("checked", () => {
        const store = new Store({value: true});
        return (
            <State store={store}>
                <InputCheckbox value={store.get("value")} onChange={(value) => {
                    store.set({value});
                    onChange(value);
                }} />
            </State>
        );
    })
    .add("unchecked", () => {
        const store = new Store({value: false});
        return (
            <State store={store}>
                <InputCheckbox value={store.get("value")} onChange={(value) => {
                    store.set({value});
                    onChange(value);
                }} />
            </State>
        );
    });
