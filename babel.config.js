module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        [
            require.resolve("babel-plugin-module-resolver"),
            {
                root: ["./src/"],
                alias: {
                    navigations: "./src/navigations",
                    modules: "./src/modules",
                    models: "./src/models",
                    database: "./src/database",
                },
                extensions: [".js", ".jsx", ".tsx", ".ios.js", ".android.js"],
            },
        ]
    ]
};
