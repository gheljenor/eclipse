import {storiesOf} from "@storybook/react";
import * as React from "react";
import {EBattleShipType} from "../src/battle/battleship";

import ShipTypeSelect from "../src/ui/components/ship-type-select";

storiesOf("ShipTypeSelect", module)
    .add("not selected", () => <ShipTypeSelect />)
    .add("select cruiser", () => <ShipTypeSelect type={EBattleShipType.cruiser} />);
