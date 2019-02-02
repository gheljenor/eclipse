import {storiesOf} from "@storybook/react";
import * as React from "react";

import {action} from "@storybook/addon-actions";
import ShipBlueprint from "../src/ui/components/ship-blueprint";

const onChange = action("onChange");

storiesOf("ShipBlueprint", module)
    .add("default", () => <ShipBlueprint onChange={onChange} />);
