// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mavonEditor from 'mavon-editor'

import 'mavon-editor/dist/css/index.css'
import ElementUI from 'element-ui';
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(mavonEditor)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})