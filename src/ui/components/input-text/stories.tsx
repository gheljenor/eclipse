/* tslint:disable:jsx-alignment */

import * as React from "react";

import {State, Store} from "@sambego/storybook-state";
import {action} from "@storybook/addon-actions";
import {storiesOf} from "@storybook/react";

import InputText from "./index";

const onChange = action("onChange");

storiesOf("InputText", module)
    .add("empty", () => {
        const store = new Store({value: ""});
        return (
            <State store={store}>
                <InputText value={store.get("value")} onChange={(value) => {
                    store.set({value});
                    onChange(value);
                }} />
            </State>
        );
    })
    .add("with text", () => {
        const store = new Store({value: "some text"});
        return (
            <State store={store}>
                <InputText value={store.get("value")} onChange={(value) => {
                    store.set({value});
                    onChange(value);
                }} />
            </State>
        );
    });
