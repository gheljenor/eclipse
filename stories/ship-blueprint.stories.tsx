import {storiesOf} from "@storybook/react";
import * as React from "react";

import {action} from "@storybook/addon-actions";
import ShipBlueprint from "../src/ui/components/ship-blueprint";

import stateHolderWrapper from "../src/ui/lib/state-holder-wrapper";

const WrappedShipBlueprint = stateHolderWrapper(ShipBlueprint);

const onChange = action("onChange");

storiesOf("ShipBlueprint", module)
    .add("default", () => <WrappedShipBlueprint onChange={onChange} />);
