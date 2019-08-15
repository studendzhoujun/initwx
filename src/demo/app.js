
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