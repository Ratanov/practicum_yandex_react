module.exports = {
	mode: 'production',
	devtool: false,
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
		publicPath: '/'
	},
};
