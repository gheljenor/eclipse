import * as React from "react";
import * as ReactDOM from "react-dom";

import "./index.pcss";

import {AppContainer} from "./app";

import {Provider} from "react-redux";
import {store} from "./store";

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById("app"),
);

if (module.hot) {
    module.hot.accept();
}
