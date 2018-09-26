module.exports = {
	mode: "development",
	entry: "./src/index.tsx",
	output: {
		filename: "[name].js",
		path: __dirname + "/public/dist"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader",
				options: {
					transpileOnly: true,
					useBabel: true,
					useCache: true,
					babelOptions: {
						babelrc: true
					}
				}
			},
			{ test: /\.css$/, use: ["style-loader", "css-loader"] },
			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
		]
	},
	devtool: "source-map",
	target: "electron-main"
};
