import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.mjs',

  output: {
    format: 'esm',
    file: 'dist/Meta.bundle.mjs'
  },

  plugins: [
    resolve(),
    babel()
  ]
}
