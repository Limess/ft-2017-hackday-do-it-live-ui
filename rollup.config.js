// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'statics/hack.js',
  output: {
    file: 'output/hack.js',
    format: 'iife'
  },
  watch: {
    include: 'statics/**'
  },
  plugins: [
    postcss({
      extensions: [ '.css' ],
    }),
    commonjs(),
    resolve({
      main: true,
      browser: true
    }),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};