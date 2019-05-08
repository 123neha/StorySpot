module.exports = {
    extends: "airbnb-base",
    env: {
        browser: true,
        node: true
    },
    rules: {
        "prefer-destructuring": ["error", {
            "array": false,
            "object": false
        }],
        "comma-dangle": ["error", "never"],
        "linebreak-style": 0
    }
};