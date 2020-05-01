/**
 * @doc https://googlechromelabs.github.io/sw-toolbox/api.html#main
 */
importScripts('https://cdn.bootcss.com/sw-toolbox/3.6.1/sw-toolbox.js')

toolbox.router.get(/\/$|\.html$/,
  self.toolbox.networkFirst, {
  cache: {
    name: "pages"
    ,maxEntries: 10
  }
})

toolbox.router.get(/(cdn.bootcss|unsafe-production.jspm)*/,
  self.toolbox.fastest, {
  cache: {
    name: 'deps'
    ,maxEntries: 10
  }
})

toolbox.router.get(/.+\/config\.js$|\/src\/[\S]+\.js$/,
  self.toolbox.networkFirst, {
  cache: {
    name: "scripts"
    ,maxEntries: 10
  }
})

toolbox.router.get(/api.github.com/,
  self.toolbox.fastest, {
  cache: {
    name: "scripts"
    ,maxEntries: 10
  }
})

// toolbox.router.get(/\/cdll\.sw\.js$/,
//   self.toolbox.networkFirst
//   ,{}
// )

toolbox.router.get(/\.json$/,
  self.toolbox.fastest, {
  cache: {
    name: "datas"
    ,maxEntries: 10
  }
})

toolbox.router.get(/\/src[\S]+\.css$/,
  self.toolbox.fastest, {
  cache: {
    name: "styles"
    ,maxEntries: 10
  }
})
