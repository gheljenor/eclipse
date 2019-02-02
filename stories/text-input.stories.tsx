import {storiesOf} from "@storybook/react";
import * as React from "react";

import {action} from "@storybook/addon-actions";
import TextInput from "../src/ui/components/text-input";
import stateHolderWrapper from "../src/ui/lib/state-holder-wrapper";

const WrappedTextInput = stateHolderWrapper(TextInput);

const onChange = action("onChange");

storiesOf("TextInput", module)
    .add("empty", () => <WrappedTextInput _change={"state"} onChange={onChange} />)
    .add("value='filled'", () => <WrappedTextInput _change={"state"} state={"filled"} onChange={onChange} />);
