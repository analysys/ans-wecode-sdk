/**
 * 发布API
 */
import * as ans from './API/index.js'
import Util from './lib/common/index.js'
import baseConfig from './lib/baseConfig/index.js'
import * as getField from './lib/fillField/getField.js'
import { lifecycle } from './configure/index.js'
import { startUp } from './API/template/startUp.js'
import { clearCache } from './lib/fillField/index.js'
import { getSysTem } from './configure/customized/deviceInfo/lib/system'
window.AnalysysAgent = window.AnalysysAgent || {}
var AnalysysAgent = window.AnalysysAgent
var config = AnalysysAgent.config || {}
var param = []
if (AnalysysAgent.isInit !== true) {
  for (var key in ans) {
    AnalysysAgent[key] = (function (key) {
      return function () {
        var _arguments = arguments
        if (key.indexOf('get') > -1) {
          return ans[key].apply(ans[key], _arguments)
        }
        param.push([key, arguments])
      }
    })(key)
  }
}
function _createAnsSDK () {
  AnalysysAgent.isInit = true
  for (var key in ans) {
    AnalysysAgent[key] = ans[key]
  }
  for (var configKey in config) {
    if (Util.paramType(getField[configKey]) === 'Function') {
      getField[configKey](config[configKey])
    } else {
      baseConfig.base[configKey] = config[configKey]
    }
  }

  AnalysysAgent.config = Util.objMerge(baseConfig.base, config)
  // AnalysysAgent.config.setDebugModel = getField.debugMode
  baseConfig.base = AnalysysAgent.config

  clearCache()
  for (var y = 0; y < param.length; y++) {
    var yItem = param[y]
    if (Util.objHasKay(ans, yItem[0]) && (yItem[0] === 'identify' || yItem[0] === 'alias' || yItem[0].indexOf('Super') > -1)) {
      ans[yItem[0]].apply(ans[yItem[0]], yItem[1])
    }
  }
  if (lifecycle.AnalysysAgent && lifecycle.AnalysysAgent.init) {
    lifecycle.AnalysysAgent.init(baseConfig.base)
  }
  // 如存在修改则重置登录及启动状态
  startUp()
  for (var z = 0; z < param.length; z++) {
    var zItem = param[z]
    if (Util.objHasKay(ans, zItem[0]) && zItem[0] !== 'identify' && zItem[0] !== 'alias' && zItem[0].indexOf('Super') < 0) {
      ans[zItem[0]].apply(ans[zItem[0]], zItem[1])
    }
  }
}

AnalysysAgent.init = function (conf) {
  if (Util.paramType(config) === 'Object') {
    config = conf
    getSysTem(_createAnsSDK)
  }
}

export default AnalysysAgent