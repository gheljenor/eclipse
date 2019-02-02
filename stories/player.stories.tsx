import {storiesOf} from "@storybook/react";
import * as React from "react";

import {action} from "@storybook/addon-actions";
import Player from "../src/ui/components/player";

import stateHolderWrapper from "../src/ui/lib/state-holder-wrapper";

const WrappedPlayer = stateHolderWrapper(Player);

const onChange = action("onChange");

storiesOf("Player", module)
    .add("default", () => <WrappedPlayer onChange={onChange} />);
