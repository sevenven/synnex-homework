const path = require('path')
const { override, addDecoratorsLegacy, adjustStyleLoaders } = require('customize-cra')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const customize = () => (config, env) => {
  config.resolve.alias['@'] = resolve('src')
  if (env === 'production') {
    config.externals = {
      'react': 'React',
      'react-dom': 'ReactDOM'
    }
  }
  return config
};

module.exports = override(
  adjustStyleLoaders(rule => {
    if (rule.test.toString().includes('scss')) {
      rule.use.push({
        loader: require.resolve('sass-resources-loader'),
        options: {
          resources: './src/assets/scss/var.scss'
        }
      });
    }
  }),
  addDecoratorsLegacy(),
  customize()
)
