import {storiesOf} from "@storybook/react";
import * as React from "react";

import {action} from "@storybook/addon-actions";
import Checkbox from "../src/ui/components/checkbox";
import stateHolderWrapper from "../src/ui/lib/state-holder-wrapper";

const WrappedCheckbox = stateHolderWrapper(Checkbox);

const onChange = action("onChange");

storiesOf("Checkbox", module)
    .add("empty", () => <WrappedCheckbox _change={"state"} onChange={onChange} />)
    .add("checked", () => <WrappedCheckbox _change={"state"} state={true} onChange={onChange} />)
    .add("unchecked", () => <WrappedCheckbox _change={"state"} state={false} onChange={onChange} />);
