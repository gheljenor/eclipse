import * as React from "react";
import * as ReactDOM from "react-dom";
import Setup from "./components/setup";

ReactDOM.render(
    <Setup />,
    document.getElementById("app"),
);

module.hot.accept();
