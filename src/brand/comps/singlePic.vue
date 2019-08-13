/*
 * @Author: zhouJun 
 * @Date: 2018-03-09 16:46:43 
 * @Last Modified by: yhw.yinhongwei
 * @Last Modified time: 2019-04-22 15:51:22
 */
<template>
    <div @click="go(data.imgList[0].scheme)" :class="['singlePic', ismargin ? '' : 'mt', ispadding ? 'plr10' : '']" :style="bgColor">
        <!-- <image src="http://gfs7.atguat.net.cn/wireless/T185hjBmZT1RCvBVdK_750_289.png" style="width:750px;height:289px"></image> -->
        <!-- <text>{{getPicH(data.imgList[0].imageUrl).height}}</text><text>{{data.imgList[0].imageUrl.replace('atguat.net.cn/wireless/', '')}}</text> -->
        <!-- :style="getPicH(data.imgList[0].imageUrl)"-->
       <image :resize="contain" :src="data.imgList[0].imageUrl" :style="getPicH(data.imgList[0].imageUrl, ispadding)" :placeholder="defalutBg"></image>
    </div>
</template>
<style scoped>
.singlePic{
    width:750px;
    /* margin-bottom:14px; */
    align-items:center;
}
.img{
    width:750px;
    /* height:200px; */
}
.margin{
    width:722px;
    /* height:200px; */
}
.mt {
    margin-top: 10px;
}
.plr10 {
    padding-right: 10px;
    padding-left: 10px;
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
        ismargin(){
           return this.data.templateMargin==1?true:false
        },
        ispadding(){
           return this.data.templatePadding==1?true:false
        },
        bgColor(){
           return {backgroundColor:this.data.templateBgColor || 'transparent'}
        }
    },
    mounted(){
    },
    methods:{
        go(url){
          weex.requireModule('PageManagerModule').jump(url)
        }
    }
  }
</script>