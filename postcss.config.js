module.exports = {
    plugins: {
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
