import { temp } from '../../lib/mergeRules/index.js'
import { fillField, checkPrivate, resetCode } from '../../lib/fillField/index.js'
import { setReferrer } from '../../lib/fillField/getField.js'
import baseConfig from '../../lib/baseConfig/index.js'
import { upLog } from '../../lib/upload/index.js'
import Util from '../../lib/common/index.js'
import Storage from '../../lib/storage/index.js'

var pageCloseStatus = false
var pageUrl = window.location.href

/**
 * @method pageView 统计页面事件
 * 第一个参数为页面名称 类型：String
 * 第二个参数为自定义属性 类型：Object/Function
 * 第三个参数为回调函数 类型：Function
 * 示例:
 * AnalysysAgent.pageView('首页')
 * AnalysysAgent.pageView('首页',{ 'commodityName': 'iPhone'})
 * AnalysysAgent.pageView('首页',{
 *  'commodityName': function(){
 *    return 'iPhone'
 *  }
 * })
 * AnalysysAgent.pageView('首页',{
 *  'commodityName': function(){
 *    return 'iPhone'
 *  }
 * },function(){
 *  console.log('上报日志成功')
 * })
 * @param {String} pageName
 * @param {Object} obj
 * @param {function} callback
 */
function pageView (pageName, obj, callback) {
  var log = pageViewLog(pageName, obj)

  // 去除空数据后上传数据
  upLog(log, callback)
}

function pageViewLog (p, o) {
  var pageName = p
  var obj = o
  // 页面关闭组件发送
  if (window.AnalysysModule && window.AnalysysModule.pageClose) {
    if (pageCloseStatus === true) {
      window.AnalysysModule.pageClose.pageEndTrack()
    } else {
      pageCloseStatus = true
    }
    if (Util.paramType(pageName) === 'String') {
      window.AnalysysModule.pageClose.createTime(+new Date(), pageName)
    } else {
      window.AnalysysModule.pageClose.createTime(+new Date())
    }
  }
  /**
     * 判断黑白名单
     * 符合黑名单，不上报
     * 有白名单，且不符合白名单，不上报
     */
  if (Util.checkTypeList(baseConfig.base.pageViewBlackList) || (baseConfig.base.pageViewWhiteList && !Util.checkTypeList(baseConfig.base.pageViewWhiteList))) return

  baseConfig.status.FnName = '$pageview'
  resetCode()
  var nameObj = {}
  if (Util.paramType(pageName) === 'String') {
    nameObj = {
      $title: pageName
    }
    checkPrivate(nameObj)
  } else if (Util.paramType(pageName) === 'Object') {
    obj = pageName
    pageName = ''
  } else if (Util.paramType(pageName) === 'Function') {
    obj = ''
    pageName = ''
  }
  if (Util.paramType(obj) === 'Function') {
    obj = ''
  }
  var userProp = {}

  if (Util.paramType(obj) === 'Object') {
    for (var key in obj) {
      if (Util.paramType(obj[key]) === 'Function') {
        obj[key] = obj[key].call(obj[key])
      }
    }
    // 检测用户自定义属性
    if (baseConfig.base.isHybrid === false) {
      checkPrivate(obj)
    }
    userProp = {
      xcontext: obj || {}
    }
  }

  var arkSuper = Storage.getLocal('ARKSUPER') || {}
  if (baseConfig.base.isHybrid === true) {
    arkSuper = {}
  }
  /**
     * 超级属性与用户自定义属性合并
     */
  var xcontext = Util.objMerge({
    xcontext: arkSuper
  }, userProp)

  /**
     * 与$pagename属性合并
     */
  xcontext = Util.objMerge(xcontext, {
    xcontext: nameObj
  })

  var pageViewTemp = temp('$pageview')
  var pageViewObj = Util.delEmpty(fillField(pageViewTemp))

  setReferrer(pageUrl)
  /**
     * 自动采集与个性化属性合并
     */
  return Util.objMerge(pageViewObj, xcontext)
}


function hashPageView () {
  Util.changeHash(function () {
    if (pageUrl !== window.location.href) {
      pageUrl = window.location.href
      pageView()
    }
  })
}
export { pageView, hashPageView, pageViewLog }
