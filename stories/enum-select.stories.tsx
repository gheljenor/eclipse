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
            types={EBattleShipType}
            titles={shipTypeTitles}
        />
    ))
    .add("ship types, cruiser selected", () => (
        <EnumTypeSelect
            types={EBattleShipType}
            titles={shipTypeTitles}
            value={EBattleShipType.cruiser}
        />
    ))
    .add("weapon types, not selected", () => (
        <EnumTypeSelect
            types={EWeaponDamageType}
            titles={weaponTypeTitles}
        />
    ))
    .add("weapon types, blue selected", () => (
        <EnumTypeSelect
            types={EWeaponDamageType}
            titles={weaponTypeTitles}
            value={EWeaponDamageType.blue}
        />
    ))
    .add("weapon classes, not selected", () => (
        <EnumTypeSelect
            types={EWeaponType}
            titles={weaponClassTitles}
        />
    ))
    .add("weapon types, gun selected", () => (
        <EnumTypeSelect
            types={EWeaponType}
            titles={weaponClassTitles}
            value={EWeaponType.gun}
        />
    ));
