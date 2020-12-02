/**
 * SDK 基础字段定义表
 * base.outer：上报日志基础结构定义
 * base.xcontext:上报报文找中xcontext下的共有字段定义
 * $开头的字段为各个事件特殊拥有字段
 */
var temp = {}
var event = ['$startup', '$track', '$pageview', '$user_click']
var common = {
  // "base": {
  xcontext: [
    '$brand',
    '$model',
    '$os',
    '$os_version',
    '$network'
  ]
  // }
}
for (var i = 0; i < event.length; i++) {
  temp[event[i]] = common
}
export default temp
