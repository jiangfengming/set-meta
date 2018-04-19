import babel from 'rollup-plugin-babel'

export default {
  input: 'src/Meta.js',
  output: {
    format: 'umd',
    name: 'Meta',
    file: 'dist/Meta.js'
  },
  plugins: [
    babel()
  ]
}
