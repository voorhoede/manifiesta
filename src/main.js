// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './components/app/app'
require('../node_modules/vuetify/dist/vuetify.min.css')
require('../node_modules/mdi/css/materialdesignicons.min.css')

Vue.config.productionTip = false
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<app/>',
  components: { App }
})
