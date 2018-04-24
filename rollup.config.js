import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/Meta.js',
  output: {
    format: 'umd',
    name: 'Meta',
    file: 'dist/Meta.js'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({ exclude: 'node_modules/**' })
  ],
  preserveSymlinks: true
}
