import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.mjs',
  output: {
    format: 'es',
    file: 'dist/Meta.mjs'
  },
  plugins: [
    resolve(),
    babel({ exclude: 'node_modules/**' })
  ]
}
