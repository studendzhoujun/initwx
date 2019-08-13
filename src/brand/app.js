/*
 * @Author: zhouJun 
 * @Date: 2017-09-09 12:21:33 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2019-05-28 16:09:58
 */
import app from './index.vue'
// import too from './too.vue'
import store from './stores/index.js'
import mixins from './mixins/index.js'
// export default new Vue(Vue.util.extend({ el: '#roott' }, app));

Vue.mixin(mixins)
new Vue({
    el:'#root',
    store,
    render:h=>h(app)
})
// store.dispatch('initData')
store.dispatch('initIndex')