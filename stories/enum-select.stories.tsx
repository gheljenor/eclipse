import {storiesOf} from "@storybook/react";
import * as React from "react";
import {EBattleShipType} from "../src/battle/battleship";
import {EWeaponDamageType, EWeaponType} from "../src/battle/i-weapon";

import EnumTypeSelect from "../src/ui/components/enum-select";

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

storiesOf("EnumTypeSelect", module)
    .add("ship types, not selected", () => (
        <EnumTypeSelect
            values={shipTypeTitles}
        />
    ))
    .add("ship types, cruiser selected", () => (
        <EnumTypeSelect
            values={shipTypeTitles}
            value={EBattleShipType.cruiser}
        />
    ))
    .add("weapon-group types, not selected", () => (
        <EnumTypeSelect
            values={weaponTypeTitles}
        />
    ))
    .add("weapon-group types, blue selected", () => (
        <EnumTypeSelect
            values={weaponTypeTitles}
            value={EWeaponDamageType.blue}
        />
    ))
    .add("weapon-group classes, not selected", () => (
        <EnumTypeSelect
            values={weaponClassTitles}
        />
    ))
    .add("weapon-group types, missile selected", () => (
        <EnumTypeSelect
            values={weaponClassTitles}
            value={EWeaponType.missile}
        />
    ));
