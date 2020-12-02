import { temp } from '../../lib/mergeRules/index.js'
import { fillField, resetCode } from '../../lib/fillField/index.js'
import baseConfig from '../../lib/baseConfig/index.js'
import { upLog } from '../../lib/upload/index.js'
import Util from '../../lib/common/index.js'
import Storage from '../../lib/storage/index.js'
function freeApi (apiName, property) {

  baseConfig.status.FnName = apiName
  resetCode()
  var freeApiTemp = temp(apiName)
  if (!freeApiTemp) {
    return
  }
  var freeApiLog = fillField(freeApiTemp)
  var arkSuper = Storage.getLocal('ARKSUPER') || {}

  if (Util.paramType(property) === 'Object') {
    arkSuper = Util.objMerge(arkSuper, property)
  }
  freeApiLog = Util.objMerge({ xcontext: arkSuper }, freeApiLog)

  upLog(Util.delEmpty(freeApiLog))
}
export { freeApi }
