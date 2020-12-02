import Util from '../../../../lib/common/index.js'
import { getElementContent } from '../../userClick/lib/elementContent.js'
function getPath (ele) {
  var tagName = ele.tagName.toLowerCase()
  var classPath = ''
  var classNameList = Util.paramType(ele.className) !== 'String' ? [] : ele.className.split(' ')
  for (var i = 0; i < classNameList.length; i++) {
    if (classNameList[i] && classNameList[i].indexOf('ARK') < 0) {
      classPath += '.' + classNameList[i]
    }
  }
  return {
    className: classPath,
    id: ele.id || '',
    tagName: tagName
  }
}
function domParentList (ele, status) {
  var list = []
  var newPath = []
  var parent = ele
  while (parent != null) {
    var eleNodeType = parent.nodeType
    if (eleNodeType !== 1) {
      parent = parent.parentNode
      continue
    }
    var elePath = getPath(parent)
    var pathIndex = null
    if (status !== true) {
      pathIndex = getEleIndex(parent)
    }

    // if (!status) {
    list.push(elePath.tagName + (elePath.id ? '#' + elePath.id : '') + elePath.className)
    // } else {
    var path = {
      // className: elePath.className || '',
      id: elePath.id,
      tagName: elePath.tagName,
    }
    if (elePath.row !== null) {
      path['row'] = pathIndex.row
    } else {
      path['index'] = pathIndex.index
    }
    newPath.push(Util.delEmpty(path))
    // }

    parent = parent.parentNode
  }
  return {
    path: list.join('<'),
    newPath: newPath
  }
}

function getEleIndex (ele) {
  var parent = ele.parentNode
  var index = 0
  var parnetStatus = true
  var row = null
  while (parent !== null && parnetStatus === true) {
    var eleNodeType = parent.nodeType
    if (eleNodeType !== 1) {
      parent = parent.parentNode
      continue
    }
    var childEles = parent.children
    var childElesPath = []
    var elePath = []
    for (var i = 0; i < childEles.length; i++) {
      var childElePath = getPath(childEles[i])
      childElesPath.push(childElePath)
      if (ele === childEles[i]) {
        elePath = childElePath
        index = i
      }
    }
    for (var y = 0; y < childEles.length; y++) {
      if (newPathContrast({ newPath: childElesPath[y] }, elePath) === true) {
        row = index
      }
    }
    parnetStatus = false
  }
  return {
    row: row,
    index: index
  }
}

function parentContrast (clickPathList, eventPathList) {
  for (var i = 0; i < clickPathList.length; i++) {
    if (clickPathList[i].split('.')[0] !== eventPathList[i].split('.')[0]) {
      return false
    }
  }
  return true
}
/**
 * 拥有new_path时，点击元素是否符合可视化元素列表中的元素
 *
 * @param {*} clickEleObj 点击元素
 * @param {*} eventEleObj 可视化元素
 * @returns {Boolean} 是否符合
 */
function newPathContrast (clickObj, eventNewPath, isNotDeep) {
  var clickNewPath = clickObj.newPath
  var clickNewPathList = Util.arrayMerge([], clickNewPath)
  var eventNewPathList = Util.arrayMerge([], eventNewPath)
  var newPath = Util.arrayMerge([], clickNewPath)
  if (clickNewPathList === eventNewPathList) {
    return true
  }
  if (clickNewPathList.length < eventNewPathList.length) {
    return false
  }
  if (clickObj.ele && clickNewPathList.length > eventNewPathList.length) {
    if (isNotDeep === true) {
      return false
    }
    var num = clickNewPathList.length - eventNewPathList.length
    clickNewPathList.splice(0, num)
    var ele = clickObj.ele
    for (var i = 0; i < num; i++) {
      ele = ele.parentNode || document.body
    }
    clickObj.ele = ele

    newPath = Util.arrayMerge([], clickNewPathList)
  }
  var status = true
  var startNum = 0
  while (startNum < eventNewPathList.length) {
    var eventPath = eventNewPathList[startNum]
    var clickPath = clickNewPathList[startNum]

    if (Util.objHasKay(clickPath, 'row') === true && Util.objHasKay(eventPath, 'row') === false && Util.objHasKay(clickPath, 'index') === false) {
      delete clickPath.row
    }
    if ((eventPath.id && eventPath.id !== clickPath.id) ||
      eventPath.tagName !== clickPath.tagName ||
      (Util.paramType(eventPath.className) === 'String' && ((clickPath.className.indexOf(eventPath.className) < 0) || eventPath.className.indexOf(clickPath.className) < 0)) ||
      clickPath.index !== eventPath.index ||
      clickPath.row !== eventPath.row) {
      status = false
      break
    }
    startNum++
  }
  if (status === true) {
    clickObj.newPath = newPath
  }
  return status
}
function isClassContrast (clickEle, eventClass) {
  var clickClass = clickEle ? clickEle.className : null
  if (Util.paramType(clickClass) === 'String' && Util.paramType(eventClass) === 'String') {
    clickClass = Util.trim(clickClass) || null
    eventClass = Util.trim(eventClass) || null
    if (clickClass && eventClass && clickClass.indexOf(eventClass) > -1) {
      return true
    }
  }
  return false
}
function bindingContrast (ele, bindings) {
  for (var i = 0; i < bindings.length; i++) {
    var binding = bindings[i]
    if (binding.prop_name === 'text') {
      var eleText = getElementContent(ele)
      if (eleText !== binding.value) {
        return false
      }
    } else if (binding.prop_name === 'class') {
      if (!isClassContrast(ele, binding.value)) {
        return false
      }
    }
  }
  return true
}
/**
 * 点击元素是否符合可视化元素列表中的元素
 * @param {JSON} clickEleObj 点击元素
 * @param {JSON} eventEleObj 可视化元素
 * @returns {Boolean} 是否符合
 */
function pathContrast (clickEleObj, eventEleObj, isNotDeep) {
  var status = true
  var isNewPath = false
  eventEleObj.bindings = eventEleObj.bindings || eventEleObj.props_binding

  if (clickEleObj.newPath && eventEleObj.newPath) {
    isNewPath = true
    status = newPathContrast(clickEleObj, eventEleObj.newPath, isNotDeep)
  }
  if (status === true && eventEleObj.bindings && eventEleObj.bindings.length > 0) {
    isNewPath = true
    status = bindingContrast(clickEleObj.ele, eventEleObj.bindings)
  }
  if (isNewPath) {
    return status
  }
  var clickPath = clickEleObj.path || clickEleObj.link
  var eventPath = eventEleObj.path || eventEleObj.link
  var clickIndex = clickEleObj.index || 0
  var eventIndex = eventEleObj.index || 0
  var clickEle = clickEleObj.ele || null
  var isText = eventEleObj.isText || ''
  if (isText !== '') {
    var eleText = getElementContent(clickEle)
    if (isText !== eleText) {
      return false
    }
  }
  if (clickPath === eventPath && clickIndex === eventIndex) {
    return true
  }
  var clickPathArray = clickPath.split('<')
  var eventPathArray = eventPath.split('<')

  if (clickPathArray.length < eventPathArray.length) {
    return false
  }

  if (clickPathArray.length > eventPathArray.length) {
    var lengthNum = clickPathArray.length - eventPathArray.length
    clickPathArray = clickPathArray.splice(lengthNum)
    // 点击的为子节点则不校验点击元素位置
    // clickIndex = eventIndex
    var parentEle = clickEle
    while (lengthNum > 0 && parentEle) {
      parentEle = parentEle.parentNode
      lengthNum--
    }
    if (!parentEle) {
      return false
    }
    clickIndex = setIndex(parentEle, clickPathArray.join('<'))
  }
  if (parentContrast(clickPathArray, eventPathArray) && clickIndex === eventIndex) {
    return true
  }

  return false
}

/**
 * [parserDom description]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
function parserDom (path) {
  var eleList = []
  if (path.indexOf('<') < 0) {
    return [{
      elePath: path,
    }]
  }
  var pathObj = path.split('<')
  for (var i = 0; i < pathObj.length; i++) {
    var elelPath = pathObj[i]
    eleList.push({
      elePath: elelPath
    })
  }
  return eleList
}

function setIndex (ele, link) {

  // var link = domParentList(ele)
  var eleObj = parserDom(link)
  if (eleObj.length === 0) {
    return 0
  }
  var baseEle = eleObj[0]
  if (baseEle.elePath.indexOf('#') > -1) {
    baseEle.elePath = '#' + baseEle.elePath.split('#')[1]
  }
  var eleList = Util.selectorAllEleList(baseEle.elePath) // document.
  var index = 0
  for (var i = 0; i < eleList.length; i++) {
    var pathObj = domParentList(eleList[i])
    if (pathContrast({
      path: pathObj.path
    }, {
      path: link
    }) === true) {
      if (eleList[i] === ele) {
        return index
      }
      index++
    }
  }
  return 0
}

export { parserDom, domParentList, setIndex, pathContrast, newPathContrast, parentContrast }