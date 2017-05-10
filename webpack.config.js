var webpack = require('webpack');//add from section 7 foundation clip 02
var path = require('path');

module.exports = {
	entry: [
		'script!jquery/dist/jquery.min.js',
		'script!foundation-sites/dist/js/foundation.min.js',
		'./app/app.jsx', //tell webpack where to start compiling
	],
	//add from section 7 foundation clip 02
	externals: {
		jquery: 'jQuery',
	},
	plugins: [
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery'
		})
	],
	//
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	resolve: {
		//dua đường dẫn các module vào đây cho dễ quản lý
		root: __dirname,
		//dua folder duong dan cua cac components thi ko can khai bao alias nua
		modulesDirectories: [
			'node_modules',
			'./app/components/',
			'./app/api'
		],
		alias: {
			applicationStyles: 'app/styles/app.scss',
			actions: 'app/actions/actions.jsx',
			reducers: 'app/reducers/reducers.jsx',
			configureStore: 'app/store/configureStore.jsx',
			app: 'app'
		},
		extensions: ['', '.js', '.jsx']//return extension of file we want to execute
	},
	//add babel-loader de doc jsx
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0'] //stage-0 là 1 plugin của bable hỗ trợ js 2015 mới nhất
				},
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/
			}
		]
	},
	sassLoader: { //clip 083
		includePaths: [
			path.resolve(__dirname, './node_modules/foundation-sites/scss')
		]
	},
	devtool: '#inline-source-map'
};
