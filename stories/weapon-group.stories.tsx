import {action} from "@storybook/addon-actions";
import {storiesOf} from "@storybook/react";
import * as React from "react";

import {EWeaponDamageType, EWeaponType} from "../src/battle/i-weapon";

import WeaponGroup from "../src/ui/components/weapon-group";
import stateHolderWrapper from "../src/ui/lib/state-holder-wrapper";

const WrappedWeaponGroup = stateHolderWrapper(WeaponGroup);

storiesOf("WeaponGroup", module)
    .add("unselected", () => <WrappedWeaponGroup onChange={action("onChange")} />)
    .add("2 yellow missile", () => (
        <WrappedWeaponGroup
            weaponClass={EWeaponType.missile}
            type={EWeaponDamageType.yellow}
            count={2}
            onChange={action("onChange")}
        />
    ))
    .add("3 blue gun", () => (
        <WrappedWeaponGroup
            weaponClass={EWeaponType.gun}
            type={EWeaponDamageType.blue}
            count={3}
            onChange={action("onChange")}
        />
    ));
