const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        background: "./src/background.ts",
        content: "./src/content.ts",
        popup: "./src/popup.ts"
    },
    devtool: false,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    }
};