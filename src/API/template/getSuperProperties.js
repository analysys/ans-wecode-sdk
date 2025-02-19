import { resetCode } from '../../lib/fillField/index.js'
import { successLog } from '../../lib/printLog/index.js'
import baseConfig from '../../lib/baseConfig/index.js'
import Storage from '../../lib/storage/index.js'
import Util from '../../lib/common/index.js'
function getSuperProperties (callback) {
  baseConfig.status.FnName = '$getSuperProperties'
  resetCode()
  var arkSuper = Storage.getLocal('ARKSUPER') || {}
  baseConfig.status.successCode = '20010'
  baseConfig.status.value = JSON.stringify(arkSuper)
  successLog()
  if (Util.paramType(callback) === 'Function') {
    callback.call(callback, arkSuper)
  }
  return arkSuper
}
export { getSuperProperties }
