var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
	devtool:'eval-source-map',
	entry:{
		main:path.join(__dirname,'./client/index.js'),
		vendor:'moment'
	},
	output:{
		path:path.join(__dirname,'./dist'),
		filename:"[name][hash].js"
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:['style-loader','css-loader']
			},
			{
				test:/\.js$/,
				use:{
					loader:'babel-loader',
					options:{
						presets:['es2015']
					}
				},
				exclude:/node_modules/
			}
		]
	},
	plugins:[
		//压缩混淆代码
		new webpack.optimize.UglifyJsPlugin(),
		//编译html
		new HtmlWebpackPlugin({template:'./index.html'}),
		//分块打包
		new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
               // 该配置假定你引入的 vendor 存在于 node_modules 目录中
               return module.context && module.context.indexOf('node_modules') !== -1;
            }
        })
	]
};