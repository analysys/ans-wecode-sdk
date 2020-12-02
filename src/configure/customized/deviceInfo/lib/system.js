import config from '../../../../lib/baseConfig/index'
import Util from '../../../../lib/common/index.js'
function formatSystem (t) {
    var e = t.toLowerCase();
    return 'ios' === e ? 'iOS' : 'android' === e ? 'Android' : t
}
function getDeviceInfo () {
    return new Promise(function (resolve) {
        if (window.HWH5) {
            window.HWH5.getDeviceInfo().then(function (data) {
                var deviceType = formatSystem(data.osType)
                config.system.$os = formatSystem(data.osType)
                if (deviceType === 'iOS') {
                    config.system.$brand = 'Apple'
                    config.system.$os_version = data.osVersion
                } else if (deviceType === 'Android') {
                    var model = data.deviceModel || ''
                    if (model.indexOf('_') > -1) {
                        var models = model.split('_')
                        config.system.$model = models[1] || ''
                        config.system.$os_version = models[2] || ''
                    }
                } else {
                    config.system.$brand = data.deviceModel || ''
                    config.system.$os = formatSystem(data.osType)
                    config.system.$os_version = data.osVersion
                }
                resolve()
            }).catch(function () {
                resolve()
            });
        } else {
            resolve({})
        }
    })
}
function getNetworkType () {
    return new Promise(function (resolve) {
        if (window.HWH5) {
            window.HWH5.getNetworkType().then(function (data) {
                var type = data.type
                if (Util.paramType(type) === 'Number') {
                    type = '' + type
                }
                config.system.$network = type
                resolve()
            }).catch(function () {
                resolve({})
            });
        } else {
            resolve({})
        }
    })
}
var status = false
function getSysTem (callback) {
    if (status === false) {
        Promise.all([getDeviceInfo(), getNetworkType()]).then(function () {


            status = true
            callback.call(callback)
        }).catch(function () {
            status = true
            callback.call(callback)
        })
    } else {
        return callback.call(callback)
    }

}
export { getSysTem }