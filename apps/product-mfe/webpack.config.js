const { withModuleFederationPlugin, shareAll } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'productmfe',
  exposes: {
    './routes': './src/app/remote-entry.routes.ts',
  },
  shared: shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
});
