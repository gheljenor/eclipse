import {storiesOf} from "@storybook/react";
import * as React from "react";

import Spinner from "../src/ui/components/spinner";

storiesOf("Spinner", module)
    .add("limitless", () => <Spinner />)
    .add(">= 0", () => <Spinner min={0} />)
    .add("<= 6", () => <Spinner max={6} />)
    .add("0 <= x <= 6", () => <Spinner min={0} max={6} />)
    .add("initial value", () => <Spinner value={4} />);
