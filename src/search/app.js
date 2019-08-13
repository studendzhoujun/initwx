/*
 * @Author: yinhongwei 
 * @Date: 2019-04-01 11:34:05 
 * @Last Modified by: yinhongwei
 * @Last Modified time: 2019-05-29 10:01:15
 */
import app from './index.vue'
// const page = weex.requireModule('PageManagerModule')
// import store from './stores/index.js'
// import mixins from './mixins/index.js'

// Vue.mixin(mixins)

new Vue({
    el:'#root',
    // store,
    render:h=>h(app)
})
// store.dispatch('initIndex')