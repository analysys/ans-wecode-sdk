/**
 * SDK 基础字段定义表
 * base.outer：上报日志基础结构定义
 * base.xcontext:上报报文找中xcontext下的共有字段定义
 * $开头的字段为各个事件特殊拥有字段
 */
export default {
  $startup: {
    xcontext: [
      '$original_id',
      '$time_zone'
    ]
  },
  $track: {
    xcontext: [
      '$original_id',
      '$time_zone'
    ]
  },
  $pageview: {
    xcontext: [
      '$original_id',
      '$time_zone'
    ]
  },
  $web_click: {
    xcontext: [
      '$original_id',
      '$time_zone'
    ]
  },
  $user_click: {
    xcontext: [
      '$original_id',
      '$time_zone'
    ]
  }
}
