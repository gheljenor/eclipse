/* tslint:disable:jsx-alignment */

import * as React from "react";

import {State, Store} from "@sambego/storybook-state";
import {action} from "@storybook/addon-actions";
import {storiesOf} from "@storybook/react";

import InputNumber from "./index";

const onChange = action("onChange");

storiesOf("InputNumber", module)
    .add("default", () => {
        const store = new Store({value: 0});
        return (
            <State store={store}>
                <InputNumber value={store.get("value")} onChange={(value) => {
                    store.set({value});
                    onChange(value);
                }} />
            </State>
        );
    })
    .add("min=0", () => {
        const store = new Store({value: 0});
        return (
            <State store={store}>
                <InputNumber min={0} value={store.get("value")} onChange={(value) => {
                    store.set({value});
                    onChange(value);
                }} />
            </State>
        );
    })
    .add("max=10", () => {
        const store = new Store({value: 0});
        return (
            <State store={store}>
                <InputNumber max={10} value={store.get("value")} onChange={(value) => {
                    store.set({value});
                    onChange(value);
                }} />
            </State>
        );
    })
    .add("min=0, max=10", () => {
        const store = new Store({value: 0});
        return (
            <State store={store}>
                <InputNumber min={0} max={10} value={store.get("value")} onChange={(value) => {
                    store.set({value});
                    onChange(value);
                }} />
            </State>
        );
    })
    .add("value=15", () => {
        const store = new Store({value: 15});
        return (
            <State store={store}>
                <InputNumber value={store.get("value")} onChange={(value) => {
                    store.set({value});
                    onChange(value);
                }} />
            </State>
        );
    });
