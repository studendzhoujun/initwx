/*
 * @Author: zhouJun 
 * @Date: 2018-05-15 14:28:34 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-06-09 10:53:20
 */
<template>
   <div class="bigsmall" :style="bgColor">
        <floor-title :isTitle="isTitle" :titleData="data" :ismargin="ismargin"></floor-title>
        <three-pic :item="datas" v-if="imgRowNum==3"></three-pic>
        <four-pic :item="datas" v-if="imgRowNum==4"></four-pic>      
    </div>
</template>
<style scoped>
.bigsmall{
    width:750px;
}
</style>
<script>
import threePic from './threePicRow.vue'
import fourPic from './fourPic.vue'
import floorTitle from './floorTitle.vue'
export default {
    data () {
      return {
      }
    },
    props:['data'],
    created(){
    },
    computed:{
        datas(){
           return this.data.bigSmallTemplet
        },
       imgRowNum(){
        //    return 2
           return this.data.bigSmallTemplet.imgNum
       },
       ismargin(){
           return this.data.bigSmallTemplet.templateMargin==1?true:false
       },
       isTitle(){
           return this.data.displayName?true:false
       },
       bgColor(){
           const bgcol = this.data.templateBgColor?this.data.templateBgColor:''
           return {backgroundColor:bgcol}
       }
    },
    components:{
        threePic,
        fourPic,
        floorTitle
    },
    mounted(){
    },
    methods:{
    }
  }
</script>