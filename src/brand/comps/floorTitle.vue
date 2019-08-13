/*
 * @Author: zhouJun 
 * @Date: 2018-03-12 15:18:04 
 * @Last Modified by: yhw.yinhongwei
 * @Last Modified time: 2019-04-17 10:44:59
 */
<template>
    <div v-if="isTitle" :class="['floor-title',ismargin?'':'floor-margin', ispadding?'floor-padding':'']" :style="backColor">
       <image class="floor-backimg" :src="backimg"></image>
       <text class="floor-title-text" :style="titleColor">{{displayName}}</text>
       <div @click="go(scheme)" v-if="subTitleName" class="floor-title-jump">
          <text class="floor-jump-text" :style="titleColor">{{subTitleName}}</text>
          <div class="floor-arrow">
             <image :src="arrowimg" class="floor-arrow"></image>
          </div>
       </div>
    </div>
</template>
<style scoped>
.floor-title{
    width:750px;
    height:100px;
    background-color:#ffffff;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    border-bottom-style:solid;
    border-bottom-color:#cccccc;
    border-bottom-width:1px;
}
.floor-margin {
    margin-top: 10px;
}
.floor-padding{
    width:722px;
}
.floor-title-text{
    color:#000000;
    font-size:30px;
    margin-left:30px;
}
.floor-title-jump{
    margin-right:20px;
    flex-direction:row;
    align-items:center;
}
.floor-jump-text{
    font-size:20px;
}
.floor-arrow{
  width:20px;
  height: 20px;
}
.floor-backimg{
    width:750px;
    height:100px;
    position:absolute;
    left:0;
    top:0;
}
</style>
<script>
export default {
    data () {
      return {
          arrowimg:require('../img/brand-right.png')
      }
    },
    props:{
        ismargin:{
            type:Boolean,
            defalut:true
        },
        ispadding:{
            type:Boolean,
            defalut:true
        },
        titleData:{
            type:Object,
            defalut:{
            
            }
        },
        isTitle:{
            type:Boolean,
            default:false
        }
    },
    created(){
    },
    computed:{
        // isTitle(){
        //     return this.titleData.displayName?true:false
        // },
        displayName(){
            return this.titleData.displayName?this.titleData.displayName:''
        },
        subTitleName(){
            return this.titleData.templetPromo?this.titleData.templetPromo:''
        },
        backColor(){
            return {backgroundColor:this.titleData.displayBackColor?this.titleData.displayBackColor:'#FFFFFF'}
        },
        titleColor(){
            return {color:this.titleData.displayColor?this.titleData.displayColor:'#111111'}
        },
        scheme(){
            return this.titleData.promsUrl?this.titleData.promsUrl:''
        },
        backimg(){
            return this.titleData.backImgUrl
        }
    },
    mounted(){
    },
    methods:{
      go(item){
         weex.requireModule('PageManagerModule').jump(item)
      }
    }
  }
</script>