import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.mjs',
  output: {
    format: 'es',
    file: 'dist/Meta.mjs'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({ exclude: 'node_modules/**' })
  ]
}
