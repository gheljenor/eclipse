import {action} from "@storybook/addon-actions";
import {applyMiddleware} from "redux";

export function logger(name = "onStore") {
    const log = action(name);

    return applyMiddleware(() => (next) => (triggeredAction) => {
        log(triggeredAction);
        return next(triggeredAction);
    });
}
