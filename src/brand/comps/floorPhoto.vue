/*
 * @Author: zhouJun 
 * @Date: 2018-05-15 14:28:34 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-06-09 10:49:44
 */
<template>
   <div class="floorPhoto" :style="bgColor">
        <floor-title :isTitle="isTitle" :titleData="data" :ismargin="ismargin"></floor-title>
        <single-pic :data="datas" v-if="imgRowNum==1"></single-pic>
        <double-pic :data="datas" v-if="imgRowNum==2"></double-pic>
        <three-pic :data="datas" v-if="imgRowNum==3"></three-pic>      
    </div>
</template>
<style scoped>
.floorPhoto{
    width:750px;
}
</style>
<script>
import singlePic from './singlePic.vue'
import doublePic from './doublePic.vue'
import threePic from './threePic.vue'
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
         return this.data.floorPhotoTemplet
       },
       imgRowNum(){
        //    return 2
           return this.data.floorPhotoTemplet.imgRowNum
       },
       ismargin(){
           return this.data.floorPhotoTemplet.templateMargin==1?true:false
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
        singlePic,
        doublePic,
        threePic,
        floorTitle
    },
    mounted(){
    },
    methods:{
    }
  }
</script>