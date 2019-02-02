import {action} from "@storybook/addon-actions";
import {storiesOf} from "@storybook/react";
import * as React from "react";

import {EWeaponDamageType, EWeaponType} from "../src/battle/i-weapon";

import WeaponGroup from "../src/ui/components/weapon-group";
import stateHolderWrapper from "../src/ui/lib/state-holder-wrapper";

const WrappedWeaponGroup = stateHolderWrapper(WeaponGroup);

const onChange = action("onChange");

storiesOf("WeaponGroup", module)
    .add("unselected", () => <WrappedWeaponGroup onChange={onChange} />)
    .add("2 yellow missile", () => (
        <WrappedWeaponGroup
            type={EWeaponType.missile}
            damage={EWeaponDamageType.yellow}
            count={2}
            onChange={onChange}
        />
    ))
    .add("3 blue gun", () => (
        <WrappedWeaponGroup
            type={EWeaponType.gun}
            damage={EWeaponDamageType.blue}
            count={3}
            onChange={onChange}
        />
    ));
