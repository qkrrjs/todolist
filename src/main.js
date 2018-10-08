// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './pages/App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'
import PrettyCheckbox from 'pretty-checkbox-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'pretty-checkbox/src/pretty-checkbox.scss'

Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue()
// Vue.prototype.$http = axios
Vue.use(BootstrapVue)
Vue.use(PrettyCheckbox)
Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
