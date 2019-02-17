/* tslint:disable:jsx-alignment */

import * as React from "react";

import {State, Store} from "@sambego/storybook-state";
import {storiesOf} from "@storybook/react";
import {Provider} from "react-redux";
import {createStore} from "redux";

import {EWeaponDamageType, EWeaponType} from "../../../battle/i-weapon";
import {reducers} from "../../reducers";
import {logger} from "../../stories/logger";
import {WeaponListContainer} from "./index";

storiesOf("WeaponList", module)
    .add("default", () => {
        const store = createStore(reducers, {
            ships: {counter: 0, list: {0: {weapons: [0]}}},
            weapons: {
                counter: 0, list: {
                    0: {type: EWeaponType.gun, damage: EWeaponDamageType.yellow, count: 1},
                },
            },
        }, logger());

        return (
            <Provider store={store}>
                <WeaponListContainer shipId={0} />
            </Provider>
        );
    })
    .add("3 weapons", () => {
        const store = createStore(reducers, {
            ships: {counter: 0, list: {0: {weapons: [0, 1, 2]}}},
            weapons: {
                counter: 2, list: {
                    0: {type: EWeaponType.gun, damage: EWeaponDamageType.yellow, count: 1},
                    1: {type: EWeaponType.missile, damage: EWeaponDamageType.orange, count: 2},
                    2: {type: EWeaponType.gun, damage: EWeaponDamageType.blue, count: 1},
                },
            },
        }, logger());

        return (
            <Provider store={store}>
                <WeaponListContainer shipId={0} />
            </Provider>
        );
    });
