// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'statics/hack.js',
  output: {
    file: 'output/hack.js',
    format: 'iife'
  },
  plugins: [
    postcss({
      extensions: [ '.css' ],
    }),
    resolve({
      main: true,
      browser: true
    }),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};