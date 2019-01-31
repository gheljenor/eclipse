import {storiesOf} from "@storybook/react";
import * as React from "react";

import {action} from "@storybook/addon-actions";
import Spinner from "../src/ui/components/spinner";

const onChange = action("onChange");

storiesOf("Spinner", module)
    .add("limitless", () => <Spinner onChange={onChange} />)
    .add(">= 0", () => <Spinner min={0} onChange={onChange} />)
    .add("<= 6", () => <Spinner max={6} onChange={onChange} />)
    .add("0 <= x <= 6", () => <Spinner min={0} max={6} onChange={onChange} />)
    .add("initial value", () => <Spinner value={4} onChange={onChange} />);
