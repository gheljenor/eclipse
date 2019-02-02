import {storiesOf} from "@storybook/react";
import * as React from "react";

import {action} from "@storybook/addon-actions";
import Spinner from "../src/ui/components/spinner";
import stateHolderWrapper from "../src/ui/lib/state-holder-wrapper";

const WrappedSpinner = stateHolderWrapper(Spinner);

const onChange = action("onChange");

storiesOf("Spinner", module)
    .add("limitless", () => <WrappedSpinner _change={"state"} onChange={onChange} />)
    .add(">= 0", () => <WrappedSpinner _change={"state"} min={0} onChange={onChange} />)
    .add("<= 6", () => <WrappedSpinner _change={"state"} max={6} onChange={onChange} />)
    .add("0 <= x <= 6", () => <WrappedSpinner _change={"state"} min={0} max={6} onChange={onChange} />)
    .add("initial value", () => <WrappedSpinner _change={"state"} state={4} onChange={onChange} />);
