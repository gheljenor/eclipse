import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";

import {AppContainer} from "./app";
import {reducers} from "./reducers";
import {logger} from "./redux-mw/logger";

import "./index.pcss";

const store = createStore(
    reducers,
    applyMiddleware(
        logger,
    ),
);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById("app"),
);

module.hot.accept();
