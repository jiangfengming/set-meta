import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',

  output: {
    format: 'es',
    file: 'dist/Meta.js'
  },

  plugins: [
    resolve(),
    babel()
  ],

  external: ['set-open-graph']
}
