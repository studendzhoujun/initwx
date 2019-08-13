/*
 * @Author: zhouJun 
 * @Date: 2018-03-08 19:58:17 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-10-19 11:12:53
 */
<template>
   <div ref="box" class="box">
    <component :is="item.component" :data="item.data" v-for="(item,index) in items" :key="index"></component>
    <div v-if="showCont" class="cont"></div>
   </div>
</template>
<style scoped>
.box{
    width:750px;
}
.cont{
  height:120px;
}
</style>
<script>
  const modal = weex.requireModule('modal')
  const dom = weex.requireModule('dom')
  import store from './stores/index.js'
  import comps from './comps'
  export default {
    data () {
      return {
       style:{
         height:0
       }
      }
    },
    created(){
  
    },
    mounted(){
      // setTimeout(()=>{
      // const result = dom.getComponentRect(this.$refs.box, option => {
      //   this.size = option.size
      //   this.style.height=option.size.height+1700+'px'
      // })
      // },2000)
      // modal.toast({
      //   message:result.height,
      //   duration:1
      // })
    },
    computed:{
      items(){
       return  store.state.templetList.map((item)=>{
            return {component:item.templetCode,data:item.originData}
        })
      },
      showCont(){
          const flag=weex.config.env.platform=='android'
          return this.$store.state.bottomList||flag
      }
    },
    components:comps,
    methods:{
     
    }
  }
</script>