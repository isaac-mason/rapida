import path from 'path';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import workerLoader from 'rollup-plugin-web-worker-loader';

const pkg = require('./package.json');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const external = ['three'];

const config = [];

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

config.push({
  input: [path.resolve(__dirname, pkg.entry)],
  output: {
    file: path.resolve(__dirname, pkg.module),
    format: 'esm',
    sourcemap: true,
  },
  external,
  plugins: [
    workerLoader({ inline: true, sourcemap: true, pattern: /web-worker:(.+)/, targetPlatform: 'browser' }),
    babel(getBabelOptions({ useESModules: true }, '>1%, not dead, not ie 11, not op_mini all')),
    resolve({ extensions }),
    sourceMaps(),
  ],
});

module.exports = config;
