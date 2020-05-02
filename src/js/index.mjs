
import Vue from 'https://unsafe-production.jspm.io/vue/dist/vue'
import VueRouter from 'https://unsafe-production.jspm.io/vue-router/dist/vue-router'
import AntD from 'https://unsafe-production.jspm.io/ant-design-vue/dist/antd'
import 'https://unsafe-production.jspm.io/systemjs-plugin-vue'

// System.config({
//   "meta": {
//     "*.vue": {
//       "loader": "systemjs-plugin-vue"
//     }
//   }
// })
console.info({System})

Vue.use(VueRouter)
const router= new VueRouter({
  mode: 'hash'
})

Vue.use(AntD)
// fetch('/src/components/app.vue')
// .then((res)=> {
//   // console.info({res})
//   return res.text()
// })
// .then((APP)=> {
//   const template= APP.match(/^(<template)[\s|\S]{1,}(<\/template>)/ig)
//   console.info(template)
//   console.info({APP}, Vue.compile(template[0]))
// })
import APP from '/src/components/app.vue'
// const APP= {
//   data () {
//     return {
//       msg: 123
//     }
//   }
//   ,router
//   ,template: `
// <a-switch defaultChecked>
//   <a-icon type="check" slot="checkedChildren" />
//   <a-icon type="close" slot="unCheckedChildren" />
// </a-switch>
//   `
// }
window.vm= new Vue(APP)
.$mount('app')
