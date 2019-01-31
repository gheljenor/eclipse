import * as React from "react";

import {action} from "@storybook/addon-actions";
import {storiesOf} from "@storybook/react";
import WeaponList from "../src/ui/components/weapon-list";


storiesOf("WeaponList", module)
    .add("empty", () => <WeaponList onChange={action("onChange")} />);
