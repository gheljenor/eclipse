
import {storiesOf} from "@storybook/react";
import * as React from "react";

import HelloWorld from "../src/ui/components/hello-world/index";

storiesOf("Hello World", module)
    .add("example", () => <HelloWorld title={"Storybook example"} text={"Storybook text"}/>);
