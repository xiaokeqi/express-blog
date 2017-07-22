var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
	entry:{
		main:[path.join(__dirname,'./client/index.js')]
	},
	output:{
		path:path.join(__dirname,'./dist'),
		filename:"[name].[hash].js",
		publicPath:'./'
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:['style-loader','css-loader','less-loader']
			},
			{
			    test: /\.js$/,
			    exclude: /node_modules/,
			    loader: 'babel-loader'
			},
			{
				test:/\.vue$/,
				loader:'vue-loader',
				options:{
					extractCSS: true
				}
			},
			{
	            test: /\.(png|jpg)$/,
	            use: 'url-loader?limit=8192&context=client&name=[path][name].[ext]'
	        }
		]
	},
	plugins:[
		//压缩混淆代码
		new webpack.optimize.UglifyJsPlugin(),
		//编译html
		new HtmlWebpackPlugin({
			template:'./index.html',
			files:{
				css:['style.css']
			}
		}),
		//分块打包
		new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new ExtractTextPlugin('main.css'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
			$              : "jquery",
			"window.jQuery": "jquery",
		})
	],
	resolve: {
	    extensions: ['.js', '.vue']
	}

};