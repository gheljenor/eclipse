module.exports = {
    plugins: {
        "postcss-import": {},
        "precss": {},
        "postcss-preset-env": {},
        "cssnano": {
            preset: [
                "default",
                {
                    "normalizeUrl": false
                }
            ]
        }
    }
};
