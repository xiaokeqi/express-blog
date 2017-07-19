var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
	devtool:'eval-source-map',
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
            name: 'vendor',
            minChunks: function (module) {
               // 该配置假定你引入的 vendor 存在于 node_modules 目录中
               return module.context && module.context.indexOf('node_modules') !== -1;
            }
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