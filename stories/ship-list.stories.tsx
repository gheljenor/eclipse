import {storiesOf} from "@storybook/react";
import * as React from "react";

import {action} from "@storybook/addon-actions";
import ShipList from "../src/ui/components/ship-list";

import stateHolderWrapper from "../src/ui/lib/state-holder-wrapper";

const WrappedShipList = stateHolderWrapper(ShipList);

const onChange = action("onChange");

storiesOf("ShipList", module)
    .add("default", () => <WrappedShipList _change={"ships"} onChange={onChange} />);
