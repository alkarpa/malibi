module.exports = {
    plugins: ["jest-dom", "testing-library"],
    extends: ["eslint:recommended","plugin:react/recommended","plugin:jest-dom/recommended", "plugin:testing-library/react"],
    parser: "babel-eslint",
    rules: {
        "react/prop-types": "off"
    },
};