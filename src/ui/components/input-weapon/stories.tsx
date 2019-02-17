/* tslint:disable:jsx-alignment */

import * as React from "react";

import {State, Store} from "@sambego/storybook-state";
import {storiesOf} from "@storybook/react";
import {Provider} from "react-redux";
import {createStore} from "redux";

import {EWeaponDamageType, EWeaponType} from "../../../battle/i-weapon";
import {reducers} from "../../reducers";
import {logger} from "../../stories/logger";
import {InputWeaponContainer} from "./index";

storiesOf("InputWeapon", module)
    .add("default", () => {
        const store = createStore(reducers, {
            weapons: {
                counter: 0, list: {
                    0: {type: EWeaponType.gun, damage: EWeaponDamageType.yellow, count: 1},
                },
            },
        }, logger());

        return (
            <Provider store={store}>
                <InputWeaponContainer weaponId={0} />
            </Provider>
        );
    })
    .add("5 red missiles", () => {
        const store = createStore(reducers, {
            weapons: {
                counter: 0, list: {
                    0: {type: EWeaponType.missile, damage: EWeaponDamageType.red, count: 5},
                },
            },
        }, logger());

        return (
            <Provider store={store}>
                <InputWeaponContainer weaponId={0} />
            </Provider>
        );
    });
