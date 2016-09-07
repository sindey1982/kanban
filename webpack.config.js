const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const TARGET = process.env.npm_lifecycle_event;
//const NpmInstallPlugin = require('npm-install-webpack-plugin');
const PATHS = {
	app:path.join(__dirname,'app'),
	build:path.join(__dirname,'build')
};
process.env.BABEL_ENV = TARGET;
const common = {
	entry:{
		app:PATHS.app
	},
	resolve:{
		extensions:['','.js','.jsx']
	},
	output:{
		path:PATHS.build,
		filename:'bundle.js'
	},
	module:{
		loaders:[
			{
				//Test expects a RegExp! Note the slashes!
				test:/\.css$/,
				loaders:['style','css'],
				include:PATHS.app
			},
			//设置jsx 
			{
				test:/\.(js|jsx)$/,
				/*loaders:["babel?cacheDirectory"],
				include:PATHS.app*/
				loader: 'babel',
				query: {
					cacheDirectory: true,
					presets: ['react', 'es2015', 'survivejs-kanban']
				},
				include: PATHS.app
			}
		]
	}
};

//Default configuration
if(TARGET == 'start' || !TARGET){
	module.exports = merge(common,{
		devtool:'eval-source-map',
		devServer:{
			contentBase:PATHS.build,
			historyApiFallback:true,
			hot:true,
			inline:true,
			progress:true,

			//
			stats:'errors-only',
			host:process.env.HOST,
			port:process.env.PORT
		},
		plugin:[
			new webpack.HotModuleReplacementPlugin(),
			/*new NpmInstallPlugin({
				save:true//--save
			})*/
		]

	});

}

if(TARGET == 'build'){
	module.exports = merge(common,{});
}