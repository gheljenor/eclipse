import {storiesOf} from "@storybook/react";
import * as React from "react";

import {action} from "@storybook/addon-actions";
import Setup from "../src/ui/components/setup";

import stateHolderWrapper from "../src/ui/lib/state-holder-wrapper";

const WrappedSetup = stateHolderWrapper(Setup);

const onChange = action("onChange");

storiesOf("Setup", module)
    .add("default", () => <WrappedSetup onChange={onChange} />);
