import babel from 'rollup-plugin-babel'
import { eslint } from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import { uglify } from 'rollup-plugin-uglify'
import { terser } from 'rollup-plugin-terser'
import es3 from 'rollup-plugin-es3';
export default [
  {
    input: './src/main.js',
    output: [
      {
        file: './demo/public/sdk/AnalysysAgent_WeCode_SDK.amd.min.js',
        format: 'amd',
        name: 'AnalysysAgent',
        freeze: false,
        plugins: [
          commonjs(),
          uglify({
            mangle: {
              toplevel: true
            },
            ie8: true
          }),

          es3({

            remove: ['defineProperty', 'freeze']

          })
        ]
      },
      {
        file: './demo/src/sdk/AnalysysAgent_WeCode_SDK.es6.min.js',
        format: 'esm',
        name: 'AnalysysAgent',
        plugins: [
          terser({
            mangle: {
              toplevel: true
            },
            output: {
              quote_style: 1
            }
          })
        ]
      }
    ],
    plugins: [
      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      postcss({
        extensions: ['.css']
      }),
      eslint({
        include: 'src/**',
        exclude: ['node_modules/**'],
      }),
      babel({

        babelrc: false,

        presets: [['@babel/preset-env', {
          modules: false, loose: false
        }]],

        include: ['src/**'],

        plugins: ['@babel/plugin-external-helpers'],

        runtimeHelpers: true

      }),


    ]
  }
]
