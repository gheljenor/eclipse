import * as React from "react";

import {action} from "@storybook/addon-actions";
import {storiesOf} from "@storybook/react";

import WeaponList from "../src/ui/components/weapon-list";
import stateHolderWrapper from "../src/ui/lib/state-holder-wrapper";

const WrappedWeaponList = stateHolderWrapper(WeaponList);

storiesOf("WeaponList", module)
    .add("empty", () => <WrappedWeaponList _change={"weapons"} onChange={action("onChange")} />);
