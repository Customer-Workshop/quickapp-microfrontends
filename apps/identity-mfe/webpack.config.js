const { withModuleFederationPlugin, shareAll } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'identitymfe',
  exposes: {
    './routes': './src/app/remote-entry.routes.ts',
  },
  shared: shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
});
