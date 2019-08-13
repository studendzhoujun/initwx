/*
 * @Author: zhouJun 
 * @Date: 2018-05-15 14:28:34 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-06-09 10:54:26
 */
<template>
   <div class="goods" :style="bgColor">
        <floor-title :isTitle="isTitle" :titleData="data" :ismargin="ismargin"></floor-title>
        <single-row :data="datas" v-if="prodRowNum==1"></single-row>
        <double-row :data="datas" v-if="prodRowNum==2"></double-row>
        <three-row :data="datas" v-if="prodRowNum==3"></three-row>                    
    </div>
</template>
<style scoped>
.goods{
    width:750px;
    align-items:center;    
}
</style>
<script>
import singleRow from './singleRow.vue'
import doubleRow from './doubleRow.vue'
import threeRow from './threeRow.vue'
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
           return this.data.goodsTemplet
       },
       prodRowNum(){
        //   return 3
          return this.data.goodsTemplet.prodRowNum
       },
       ismargin(){
           return this.data.goodsTemplet.templateMargin==1?true:false
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
        singleRow,
        doubleRow,
        threeRow,
        floorTitle
    },
    mounted(){
    },
    methods:{
    }
  }
</script>