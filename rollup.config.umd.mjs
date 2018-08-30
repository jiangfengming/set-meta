import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.mjs',
  output: {
    format: 'umd',
    name: 'Meta',
    file: 'dist/Meta.js'
  },
  plugins: [
    resolve(),
    babel({ exclude: 'node_modules/**' })
  ]
}
