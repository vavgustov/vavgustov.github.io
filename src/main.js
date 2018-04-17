// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

let tracking = () => {
  const link_types = ['github', 'linkedin', 'email']
  mixpanel.track('page view')
  link_types.forEach((link_type) => {
    mixpanel.track_links('#' + link_type, 'click link: ' + link_type)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  tracking()
})
