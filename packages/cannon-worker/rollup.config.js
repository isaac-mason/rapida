import path from 'path';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import workerLoader from 'rollup-plugin-web-worker-loader';

const pkg = require('./package.json');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const getBabelOptions = ({ useESModules }, targets) => ({
  babelrc: false,
  extensions,
  include: ['src/**/*', '**/node_modules/**'],
  babelHelpers: 'runtime',
  presets: [
    ['@babel/preset-env', { loose: true, modules: false, targets }],
    '@babel/preset-typescript',
  ],
  plugins: [['@babel/transform-runtime', { regenerator: false, useESModules }]],
});

const baseConfig = {
  input: [path.resolve(__dirname, pkg.entry)],
  output: {
    file: path.resolve(__dirname, pkg.module),
    format: 'esm',
  },
  external: ['three'], // packages that will be external for the worker
  plugins: [
    babel(getBabelOptions({ useESModules: true }, '>1%, not dead, not ie 11, not op_mini all')),
    resolve({ extensions }),
    sourceMaps(),
  ],
}

const productionConfig = {
  ...baseConfig,
  plugins: [
    workerLoader({ inline: true, sourcemap: false, pattern: /web-worker:(.+)/, targetPlatform: 'browser' }),
    ...baseConfig.plugins,
  ]
}

module.exports = [productionConfig];
