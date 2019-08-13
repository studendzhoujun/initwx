/*
 * @Author: zhouJun 
 * @Date: 2018-03-09 14:55:04 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-04-03 11:15:57
 */
<template>
 <div v-if="showflag">
     <div class="search-mask">
     </div>
     <text @click="close" class="cancel">取消</text>
     <div class="search-input">
      <input ref="searchinput" return-key-type="search" type="text" @change="onchange" placeholder="搜索店铺内商品" class="search-input-input" autofocus="true"></input>
     </div>
 </div>
</template>
<style scoped>
.search-mask{
    position:fixed;
    width:750px;
    top:0;
    bottom:0;
    background-color:#000000;
    opacity:0.5;
    z-index:10;
}
.search-input{
    width:630px;
    height:64px;
    background-color:#ffffff;
    position:fixed;
    left:86px;
    top:21px;
    border-radius:64px;
    z-index:11;    
}
.cancel{
    color:#ffffff;
    position:fixed;
    top:31px;
    left:25px;
    z-index:11;    
    font-size:28px;
}
.search-input-input{
    width:590px;
    height:64px;
    margin-left:40px;
    border-radius:64px;
}
</style>
<script>
const navigator = weex.requireModule('navigator')
export default {
    data () {
      return {
          showflag:false
      }
    },
    created(){
    },
    computed:{
    },
    mounted(){
    },
    methods:{
        close(){
            this.showflag=false
        },
        show(){
            this.showflag=true
        },
        onchange(e){
            navigator.push({
                url: weex.config.bundleUrl.replace('brand','search') + '?key=' + encodeURI(e.value), 
                animated: "true"
            },()=>{
            })
        }
    }
  }
</script>