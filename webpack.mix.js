const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const webpack = require('webpack')
const mix = require('laravel-mix')

const isDevelopment = process.env.NODE_ENV !== 'production'

/**
 * By default, AdonisJS public path for static assets is on the `./public` directory.
 *
 * If you want to change Laravel Mix public path, change the AdonisJS public path config first!
 * See: https://docs.adonisjs.com/guides/static-assets#the-default-directory
 */

 mix
    .setPublicPath('public')
    .js('resources/js/app.js', 'public/js/')
    .react()
    .sass('resources/assets/scss/app.scss', 'public/css/')
    .options({
      processCssUrls: false
    })

if (isDevelopment) {
  mix.sourceMaps()
}

mix.webpackConfig({
 mode: isDevelopment ? 'development' : 'production',
 context: __dirname,

 node: {
   __filename: true,
   __dirname: true,
 },

 module: {
   rules: [
     {
       test: /\.(js|mjs|jsx|ts|tsx)$/,
       exclude: /node_modules/,
       use: [
         {
           loader: require.resolve('babel-loader'),
           options: {
             presets: ['@babel/preset-react'],
             plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
           },
         },
       ],
     },
   ],
 },

 plugins: [
   isDevelopment && new webpack.HotModuleReplacementPlugin(),
   isDevelopment && new ReactRefreshWebpackPlugin(),
   new webpack.ProvidePlugin({
     React: 'react',
   }),
 ].filter(Boolean),

})

// Add your assets here
