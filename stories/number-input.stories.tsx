import {storiesOf} from "@storybook/react";
import * as React from "react";

import {action} from "@storybook/addon-actions";
import NumberInput from "../src/ui/components/number-input";
import stateHolderWrapper from "../src/ui/lib/state-holder-wrapper";

const WrappedNumberInput = stateHolderWrapper(NumberInput);

const onChange = action("onChange");

storiesOf("NumberInput", module)
    .add("limitless", () => <WrappedNumberInput _change={"state"} onChange={onChange} />)
    .add(">= 0", () => <WrappedNumberInput _change={"state"} min={0} onChange={onChange} />)
    .add("<= 6", () => <WrappedNumberInput _change={"state"} max={6} onChange={onChange} />)
    .add("0 <= x <= 6", () => <WrappedNumberInput _change={"state"} min={0} max={6} onChange={onChange} />)
    .add("initial value", () => <WrappedNumberInput _change={"state"} state={4} onChange={onChange} />);
