import {action} from "@storybook/addon-actions";
import {storiesOf} from "@storybook/react";
import * as React from "react";
import {EWeaponDamageType, EWeaponType} from "../src/battle/i-weapon";
import WeaponGroup from "../src/ui/components/weapon-group";

storiesOf("WeaponGroup", module)
    .add("unselected", () => <WeaponGroup onChange={action("onChange")} />)
    .add("2 yellow missile", () => (
        <WeaponGroup
            weaponClass={EWeaponType.missile}
            type={EWeaponDamageType.yellow}
            count={2}
            onChange={action("onChange")}
        />
    ))
    .add("3 blue gun", () => (
        <WeaponGroup
            weaponClass={EWeaponType.gun}
            type={EWeaponDamageType.blue}
            count={3}
            onChange={action("onChange")}
        />
    ));
