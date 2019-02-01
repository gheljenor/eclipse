import {storiesOf} from "@storybook/react";
import * as React from "react";

import {action} from "@storybook/addon-actions";
import {EBattleShipType} from "../src/battle/battleship";
import {EWeaponDamageType, EWeaponType} from "../src/battle/i-weapon";
import EnumSelect from "../src/ui/components/enum-select";

const onChange = action("onChange");

const shipTypeTitles: { [key in EBattleShipType]: string } = {
    [EBattleShipType.interceptor]: "Interceptor",
    [EBattleShipType.cruiser]: "Cruiser",
    [EBattleShipType.dreadnought]: "Dreadnought",
    [EBattleShipType.deathmoon]: "Deathmoon",
    [EBattleShipType.starbase]: "Starbase",
};

const weaponTypeTitles: { [key in EWeaponDamageType]: string } = {
    [EWeaponDamageType.yellow]: "Yellow",
    [EWeaponDamageType.orange]: "Orange",
    [EWeaponDamageType.blue]: "Blue",
    [EWeaponDamageType.red]: "Red",
    [EWeaponDamageType.pink]: "Pink",
};

const weaponClassTitles: { [key in EWeaponType]: string } = {
    [EWeaponType.gun]: "Gun",
    [EWeaponType.missile]: "Missile",
};

storiesOf("EnumSelect", module)
    .add("ship types, not selected", () => (
        <EnumSelect
            options={shipTypeTitles}
            onChange={onChange}
        />
    ))
    .add("ship types, cruiser selected", () => (
        <EnumSelect
            options={shipTypeTitles}
            value={EBattleShipType.cruiser}
            onChange={onChange}
        />
    ))
    .add("weapon-group types, not selected", () => (
        <EnumSelect
            options={weaponTypeTitles}
            onChange={onChange}
        />
    ))
    .add("weapon-group types, blue selected", () => (
        <EnumSelect
            options={weaponTypeTitles}
            value={EWeaponDamageType.blue}
            onChange={onChange}
        />
    ))
    .add("weapon-group classes, not selected", () => (
        <EnumSelect
            options={weaponClassTitles}
            onChange={onChange}
        />
    ))
    .add("weapon-group types, missile selected", () => (
        <EnumSelect
            options={weaponClassTitles}
            value={EWeaponType.missile}
            onChange={onChange}
        />
    ));
