import * as React from "react";
import * as ReactDOM from "react-dom";
import HelloWorld from "./components/hello-world/index";

const title = "This is a title!";
const text = "This is a text";

ReactDOM.render(
    <HelloWorld title={title} text={text} />,
    document.getElementById("app"),
);

module.hot.accept();
