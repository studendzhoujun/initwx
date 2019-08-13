/*
 * @Author: zhouJun 
 * @Date: 2018-03-29 14:55:57 
 * @Last Modified by: renqingyue
 * @Last Modified time: 2019-05-17 15:16:07
 */
<template>
 <div v-if="showFoot" class="foot">
      <div @click="go(item)" v-for="(item,index) in list" :class="['wrap',index==0?'wrapl':'']">
        <div class="wrap-item">
            <image v-if="item.defaultImageUrl" :src="item.defaultImageUrl" class="icon"></image>
            <text v-if="index==0" class="txt" :style="selectFontColor">{{item.promsName|formatName}}</text>
             <text v-else class="txt" :style="defaultFontColor">{{item.promsName |formatName }}</text>
        </div>
     </div>
 </div>
</template>
<style scoped>
 .foot{
     width:750px;
     height:90px;
     background-color:#FFFFFF;
     position:fixed;
     bottom:0;
     left:0;
     flex-direction:row;
     align-items:center;
 }
 .wrap{
     height:41px;
     flex:1;
     align-items:center;  
     border-left-width:1px;
     border-left-color:#D8D9DA;
     background-color:#FFFFFF;
 }
 .wrapl{
     border-left-width:1px;
     border-left-color:#FFFFFF;
 }
 .wrap-item{
     flex-direction:row;
 }
 .txt{
     font-size:30px;
     color:#919599;
 }
 .icon{
     width:38px;
     height:37px;
     margin-right:5px;
 }
</style>
<script>
export default {
    data () {
      return {
        //  list:[
        //      {value:'圣诞节活动'},
        //      {value:'优惠劵'},
        //      {value:'在线客服',imgurl:require('../img/brand-serve.png')},
        //  ]
      }
    },
    created(){
    },
    computed:{
        list(){
            return this.$store.state.bottomList&&this.$store.state.bottomList.bottomColumnList
        },
        defaultFontColor(){
            let defaultFontColor=this.$store.state.bottomList.defaultFontColor
            return {color:defaultFontColor?defaultFontColor:'#919599'}
        },
        selectFontColor(){
            let selectFontColor=this.$store.state.bottomList.selectFontColor
            return {color:selectFontColor?selectFontColor:'#919599'}
        },
        showFoot(){
            return this.$store.state.bottomList
        }
    },
    filters:{
        formatName(value){
          if (value && value.length) {
            return value.length>8?value.slice(0,8):value
          } else {
            return value
          }
        }
    },
    mounted(){
    },
    methods:{
       // 跳转
       go(item){
          weex.requireModule('PageManagerModule').jump(item.scheme)
       }
    }
  }
</script>