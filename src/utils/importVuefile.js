
function getTemplate (str) {
  let res= str.match(/<template>[\s|\S]+<\/template>/)
  res= `${res}`.replace(/<template>|<\/template>/ig, '')
  return res
}

function getScript (str) {
  let res= str.match(/<script>[\s|\S]+<\/script>/)
  res= `${res}`.replace(/<script>|<\/script>/ig, '')
    .replace(/export\sdefault\s/, '')
    .replace(/^[\r|\n]/, '')
  return res
}

function getStyle (str) {
  let res= str.match(/<style>[\s|\S]+<\/style>/)
  function getRandomAlphabet () {
    return 'qwertyuioplkjhgfdsazxcvbnm'[
      parseInt(Math.random()* 26)
    ]
  }
  const styleTagId= Array.from(`${(Math.random()* 1000).toFixed()}`).map((num)=> {
    return `${getRandomAlphabet()}${num}`
  }).join('')
  res= `${res}`.replace(/<style>|<\/style>/g, '').replace(/\r|\n/g, '')
  return {
    context: res
    ,tagId: styleTagId
    ,el: Object.assign(document.createElement('style'), {
      id: styleTagId
      ,innerText: res
    })
  }
}

function importVuefile (vueComponent) {
  return window.fetch(vueComponent)
  .then((res)=> res.text())
  .then((res)=> {
    let [
      template
      ,vmodel
      ,style
    ]= [
      getTemplate(res)
      ,getScript(res)
      ,getStyle(res)
    ]
    vmodel= new Function(`return ${vmodel}`)()
    // console.info({template}, {vmodel})
    res= Object.assign({
      template
      ,data () {
        return {}
      }
      ,beforeMount () {
        // console.info({style})
        document.head.appendChild(style.el)
      }
      ,beforeDestroy () {
        console.warn('unmounting:', {style})
        const styleTag= style.el//document.querySelector(`#${style.id}`)
        document.head.removeChild(styleTag)
      }
    }, vmodel)
    return res
  })
}

;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.importVuefile = factory());
}(this, function () {
  return (arguments)=> importVuefile(arguments)
}))