/* tslint:disable:jsx-alignment */

import * as React from "react";

import {State, Store} from "@sambego/storybook-state";
import {action} from "@storybook/addon-actions";
import {storiesOf} from "@storybook/react";

import InputSelect from "./index";

const onChange = action("onChange");

const options = {
    1: "One",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
};

storiesOf("InputSelect", module)
    .add("1 selected", () => {
        const store = new Store({value: 1});
        return (
            <State store={store}>
                <InputSelect value={store.get("value")} options={options} onChange={(value) => {
                    store.set({value});
                    onChange(value);
                }} />
            </State>
        );
    })
    .add("3 selected", () => {
        const store = new Store({value: 3});
        return (
            <State store={store}>
                <InputSelect value={store.get("value")} options={options} onChange={(value) => {
                    store.set({value});
                    onChange(value);
                }} />
            </State>
        );
    });
