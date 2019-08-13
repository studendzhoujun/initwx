/*
 * @Author: zhouJun 
 * @Date: 2018-03-15 11:14:13 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-10-18 16:28:53
 */
<template>
<div class="box">
    <div class="doublePic">
       <div @click="go(leftimg)" :class="[ispadding?'mborderl':'borderl']">
         <image :class="[ispadding?'mimgl':'imgl']" :src="leftimg.imageUrl"></image>
       </div>
       <div @click="go(rightimg)" :class="[ispadding?'mborderr':'borderr']">
         <image :class="[ispadding?'mimgr':'imgr']" :src="rightimg.imageUrl"></image> 
       </div>
    </div>
</div>
</template>
<style scoped>
.box{
    width:750px;
    align-items:center;
    background-color:#F2F2F2;
}
.doublePic{
    width:750px;
    margin-bottom:14px;
    flex-direction:row;
    justify-content:center;
}
.borderl{
    width:374px;
    height:240px;
}
.borderr{
    width:373px;
    height:240px;
    border-left-style:solid;
    border-left-width:1px;
    border-left-color:#EBECED
}
.imgl{
    width:374px;
    height:240px;
}
.imgr{
    width:373px;
    height:240px;
}
.mborderl{
    width:357px;
    height:242px;
    border-style:solid;
    border-width:1px;
    border-color:#EBECED
}
.mborderr{
    width:358px;
    height:242px;
    border-style:solid;
    border-width:1px;
    border-color:#EBECED
}
.mimgl{
    width:355px;
    height:240px;
}
.mimgr{
    width:356px;
    height:240px;
}
</style>
<script>
export default {
    data () {
      return {
        //   ismargin:true,
          lefturl:'https://gfs6.gomein.net.cn/T1IBJQBCZT1RCvBVdK.jpg',
          righturl:'https://gfs8.gomein.net.cn/T1IJYgBKWT1RCvBVdK.jpg',
          objstyle:{
              backgroundColor:'#d60f99'
          },
      }
    },
    props:['data'],    
    created(){
    },
    computed:{
       ispadding(){
           return this.data.templatePadding==1?true:false
       },
       leftimg(){
           return this.data.imgList[0]
       },
       rightimg(){
           return this.data.imgList[1]
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