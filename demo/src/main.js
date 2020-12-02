import Vue from 'vue';
import App from './App.vue';
import i18n from '@/i18n';
import store from '@/store';
import router from '@/router';
import getLang from './utils/getLang';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './sdk/AnalysysAgent_WeCode_Encrypt.es6.min.js';
import './sdk/AnalysysAgent_WeCode_PageViewStayTime.es6.min.js';
import './sdk/AnalysysAgent_WeCode_ExposurePoint.es6.min.js'
import AnalysysAgent from './sdk/AnalysysAgent_WeCode_SDK.es6.min.js'
AnalysysAgent.init({
  appkey: '258352288dcc79e0', // APPKEY
  debugMode: 2,
  uploadURL: 'http://192.168.220.105:8089',
  exposure: {
    element_list: function () {
      return document.getElementsByTagName('button')
    }
  }
})

Vue.config.productionTip = false
Vue.use(ElementUI)
function init (i18n) {
  return new Vue({
    el: '#app',
    i18n,
    store,
    router,
    render: h => h(App)
  });
}

// 获取当前app语言参数，并初始化国际化和渲染页面。开发时，mock数据默认返回中文。
getLang()
  .then(language => {
    i18n.locale = language === 'zh' ? 'zhCN' : 'enUS';
    // i18n.locale = 'enUS';
    init(i18n);
  })
  .catch(() => {
    init();
  });
