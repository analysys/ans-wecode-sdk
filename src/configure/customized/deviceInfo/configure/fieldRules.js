/**
 * 字段填充、字段校验规则模板
 *
 * check：数据合法检测方法列表，每个方法返回bool值，以用户为准，同名覆盖
 *
 */
import config from '../../../../lib/baseConfig/index'
export default {
  xcontext: {
    $brand: {
      valueType: 0,
      value: function () {
        return config.system.$brand
      }
    },
    $model: {
      valueType: 0,
      value: function () {
        return config.system.$model
      }
    },
    $os: {
      valueType: 0,
      value: function () {
        return config.system.$os
      }
    },
    $os_version: {
      valueType: 0,
      value: function () {
        return config.system.$os_version
      }
    },
    $network: {
      valueType: 0,
      value: function () {
        return config.system.$network
      }
    }
  }
}
