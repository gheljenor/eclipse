import {addDecorator, configure} from "@storybook/react";
import {withInfo} from "@storybook/addon-info";

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /\.stories\.(js|ts)x?$/);

addDecorator(
    withInfo({
        header: false,
        inline: true
    })
);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
