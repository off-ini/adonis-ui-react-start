
Configuration de react js en front pour adonis js avec le gestionnaire **laravel-mix** et **adonix-mix-asset**

# Dépendences de exécution de script

+ `yarn add adonis-mix-asset && yarn add -D laravel-mix`

+ `yarn add -D @babel/preset-react @babel/plugin-syntax-jsx babel-loader @pmmmwh/react-refresh-webpack-plugin react-refresh`

+ `yarn add -D react react-dom react-scripts web-vitals @testing-library/jest-dom @testing-library/react @testing-library/user-event`

+ `node ace invoke adonis-mix-asset`

+ `yarn add -D concurrentl`

# Fichiers et Configuration

### file webpack.mix.js
```javascript
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
```

### .gitignore
```
# other settings...
mix-manifest.json 
hot 
public/js/* 
public/css/*
public/**/*_js*
```

### package.json (scripts)
```json
"start": "node build/server.js",
"server": "node ace serve --watch",
"client": "node ace mix:watch",
"build": "yarn client:build && yarn server:build",
"server:build": "node ace build --production",
"client:build": "node ace mix:build --production",
"dev": "concurrently \"yarn server\" \"yarn client\""
```

### babel.config.js
```javascript
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    ['@babel/preset-react', {targets: {node: 'current'}}]
  ],
};
```

