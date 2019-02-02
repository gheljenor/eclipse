import {storiesOf} from "@storybook/react";
import * as React from "react";

import {action} from "@storybook/addon-actions";
import {EBattleShipType} from "../src/battle/battleship";
import {EWeaponDamageType, EWeaponType} from "../src/battle/i-weapon";
import EnumSelect from "../src/ui/components/enum-select";

import stateHolderWrapper from "../src/ui/lib/state-holder-wrapper";

const WrappedEnumSelect = stateHolderWrapper(EnumSelect);

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
        <WrappedEnumSelect
            options={shipTypeTitles}
            _change={"state"}
            onChange={onChange}
        />
    ))
    .add("ship types, cruiser selected", () => (
        <WrappedEnumSelect
            options={shipTypeTitles}
            state={EBattleShipType.cruiser}
            _change={"state"}
            onChange={onChange}
        />
    ))
    .add("weapon-group types, not selected", () => (
        <WrappedEnumSelect
            options={weaponTypeTitles}
            _change={"state"}
            onChange={onChange}
        />
    ))
    .add("weapon-group types, blue selected", () => (
        <WrappedEnumSelect
            options={weaponTypeTitles}
            state={EWeaponDamageType.blue}
            _change={"state"}
            onChange={onChange}
        />
    ))
    .add("weapon-group classes, not selected", () => (
        <WrappedEnumSelect
            options={weaponClassTitles}
            _change={"state"}
            onChange={onChange}
        />
    ))
    .add("weapon-group types, gun selected", () => (
        <WrappedEnumSelect
            options={weaponClassTitles}
            state={EWeaponType.gun}
            _change={"state"}
            onChange={onChange}
        />
    ));
