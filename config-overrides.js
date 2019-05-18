/* tslint:disable */
const tsImportPluginFactory = require('ts-import-plugin');
const { getLoader } = require('react-app-rewired');
const path = require('path');

module.exports = function override(config, env) {
  const tsLoader = getLoader(
    config.module.rules,
    rule =>
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.includes('ts-loader')
  );

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [
        tsImportPluginFactory({
          libraryDirectory: 'es',
          libraryName: 'antd',
          style: 'css'
        })
      ]
    })
  };

  const fileLoader = getLoader(
    config.module.rules,
    rule =>
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.includes('file-loader')
  );
  const sassExtension = /\.scss$/;
  fileLoader.exclude.push(sassExtension);

  const sassLoader = {
    test: sassExtension,
    use: ['style-loader', 'css-loader', 'sass-loader']
  }
  config.module.rules.push(sassLoader);


  const textExtension = /\.txt$/;
  fileLoader.exclude.push(textExtension);
  const textLoader = {
    test: textExtension,
    use: 'raw-loader'
  };

  config.module.rules.push(textLoader);


  const glslExtension = /\.glsl$/i;
  const objFileExtension = /\.(fbx|obj|mtl)$/i;

  fileLoader.exclude.push(glslExtension, objFileExtension);

  const glslLoader = {
    test: /\.glsl$/,
    use: 'raw-loader',
    exclude: /node_modules/
  }
  config.module.rules.push(glslLoader);

  const objLoader = {
    test: objFileExtension,
    loader: 'url-loader'
  }
  config.module.rules.push(objLoader);

  return config;
}