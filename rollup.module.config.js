import babel from 'rollup-plugin-babel'
import { eslint } from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import es3 from 'rollup-plugin-es3';
import { uglify } from 'rollup-plugin-uglify'
import { terser } from 'rollup-plugin-terser'
var plugin = [
  resolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  postcss({
    extensions: ['.css']
  }),
  commonjs(),
  eslint({
    include: 'src/**',
    exclude: ['node_modules/**'],
  }),
  babel({

    babelrc: false,

    presets: [['@babel/preset-env', {
      modules: false, loose: true, "targets": {
        "ie": "6"
      }
    }]],

    include: ['src/**'],

    plugins: ['@babel/plugin-external-helpers'],

    runtimeHelpers: true

  }),

  es3({

    remove: ['defineProperty', 'freeze']

  })
]
export default [
  {
    input: './src/configure/customized/encrypt/lib/encrypt.js',
    output: [{
      file: './demo/src/sdk/AnalysysAgent_WeCode_Encrypt.es6.min.js',
      format: 'esm',
      name: 'Encrypt',
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
    }, {
      file: './demo/public/sdk/AnalysysAgent_WeCode_Encrypt.amd.min.js',
      format: 'amd',
      name: 'Encrypt',
      plugins: [
        uglify({
          mangle: {
            toplevel: true
          },
          ie8: true
        })
      ]
    }],
    plugins: plugin
  },
  {
    input: './src/configure/customized/pageClose/index.js',
    output: [{
      file: './demo/src/sdk/AnalysysAgent_WeCode_PageViewStayTime.es6.min.js',
      format: 'esm',
      name: 'PageViewStayTime',
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
    }, {
      file: './demo/public/sdk/AnalysysAgent_WeCode_PageViewStayTime.amd.min.js',
      format: 'amd',
      name: 'PageViewStayTime',
      plugins: [
        uglify({
          mangle: {
            toplevel: true
          },
          ie8: true
        })
      ]
    }],
    plugins: plugin
  },
  {
    input: './src/configure/customized/exposure/index.js',
    output: [{
      file: './demo/src/sdk/AnalysysAgent_WeCode_ExposurePoint.es6.min.js',
      format: 'esm',
      name: 'ExposurePoint',
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
    }, {
      file: './demo/public/sdk/AnalysysAgent_WeCode_ExposurePoint.amd.min.js',
      format: 'amd',
      name: 'ExposurePoint',
      plugins: [
        uglify({
          mangle: {
            toplevel: true
          },
          ie8: true
        })
      ]
    }],
    plugins: plugin
  }
]
