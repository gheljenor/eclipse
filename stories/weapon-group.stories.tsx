import {storiesOf} from "@storybook/react";
import * as React from "react";

import WeaponGroup from "../src/ui/components/weapon-group";

storiesOf("WeaponGroup", module)
    .add("unselected", () => <WeaponGroup />);
