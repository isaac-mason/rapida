const path = require('path');
// const liveServer = require('rollup-plugin-live-server');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const sourceMaps = require('rollup-plugin-sourcemaps');
const workerLoader = require('rollup-plugin-web-worker-loader');
const pkg = require('./package.json');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const moduleName = pkg.name.split('/').pop().replace(/-/g, '');
const config = [];

config.push({
  input: [path.resolve(__dirname, pkg.entry)],
  output: {
    file: path.resolve(__dirname, pkg.module),
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    resolve({ extensions }),
    commonjs(),
    workerLoader({ inline: true }),
    typescript({
      typescript: require('typescript'),
      cacheRoot: path.resolve(__dirname, '.rts2_cache'),
      clean: true,
    }),
    sourceMaps(),
  ],
});

module.exports = config;
