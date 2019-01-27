import {storiesOf} from "@storybook/react";
import * as React from "react";
import ShipBlueprint from "../src/ui/components/ship-blueprint";

storiesOf("ShipBlueprint", module)
    .add("default", () => <ShipBlueprint />);
