import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',

  output: {
    format: 'esm',
    file: 'dist/Meta.bundle.js'
  },

  plugins: [
    resolve(),
    babel()
  ]
}
