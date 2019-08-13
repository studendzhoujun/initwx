/*
 * @Author: zhouJun 
 * @Date: 2018-03-15 11:14:13 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-07-26 14:57:46
 */
<template>
    <div class="threePic">
         <image @click="go(img)" v-for="img in data.imgList" :class="[ispadding?'mimg':'img']" :src="img.imageUrl" :placeholder="defalutBg"></image>        
    </div>
</template>
<style scoped>
.threePic{
    width:750px;
    margin-bottom:14px;
    flex-direction:row;
    justify-content:center;
}
.img{
    width:250px;
    height:250px;
}
.mimg{
    width:240px;
    height:250px;
}
</style>
<script>
export default {
    data () {
      return {
          
      }
    },
    props:['data'],
    created(){
    },
    computed:{
       ispadding(){
           return this.data.templatePadding==1?true:false
       }
    },
    components:{
    },
    mounted(){
    },
    methods:{
      go(img){
         weex.requireModule('PageManagerModule').jump(img.scheme)
      }
    }
  }
</script>