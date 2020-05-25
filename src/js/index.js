
var sw_file= './sw.config.js'
navigator.serviceWorker&& navigator.serviceWorker.register(`${sw_file}?v=${1}`)

function importVuefile (filePath) {
  return System.import('./src/utils/importVuefile.js')
  .then(({
    default: _import
  })=> {
    // console.info({_import})
    return _import(filePath)
  })
}

Promise.all([
  // module: Vue
  System.import('vue')
  .then(({default: Vue})=> Vue)
  // module: ant-design-vue
  ,System.import('ant-design-vue')
  .then(({default: AntD})=> AntD)
  // module: vueRouter
  ,System.import('https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js')
  .then(({default: VueRouter})=> VueRouter)
  // component: appMain
  ,importVuefile('./src/components/app.vue')
])
.then(([
  Vue
  ,AntD
  ,VueRouter
  ,app
])=> {
  Vue.use(AntD)
  const router= function(){
    Vue.use(VueRouter)
    const routes= new VueRouter({
      mode: 'hash'
      ,base: function(matched){
        return matched
          ? matched[0]
          : '/'
      }(location.pathname.match(/\/(.+?\/){0,1}/))
      ,routes: [{
        path: '/'
        ,component: resolve=> importVuefile('./src/components/page-switch.vue').then(resolve)
      }, {
        path: '/home'
        ,component: resolve=> importVuefile('./src/components/page-home.vue').then(resolve)
      }]
    })
    routes.beforeEach((to, from, next)=> {
      return next((vm)=> {
        console.info({vm})
        routes.app.lazyLoading= true
      })
    })
    routes.beforeResolve((to, from, next)=> {
      return next((vm)=> {
        routes.app.lazyLoading= false
      })
    })
    return routes
  }()

  const App= Vue.extend(app)
  window.vm= new App({
    data () {
      return {}
    }
    ,router
    ,el: 'app'
  })
})
