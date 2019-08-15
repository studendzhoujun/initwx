<template>
   <div>
   <slide-show></slide-show>
   <tab></tab>
  </div>  
</template>
<script>
  import slideShow from './comps/slideShow.vue'
  import tab from './comps/tab.vue'
  export default {
    data () {
      return {
    
      }
    },
    components:{
        slideShow,
        tab,
    }
  }
</script>
