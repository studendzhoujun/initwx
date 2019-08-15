<template>
   <scroller class="box" scroll-direction="vertical">
        <div class="info-tips">
            <text class="tips-text">上次的贷款申请已取消,如有需求请重新申请</text>
        </div>
        <div class="">
             <image class="bg-img" :src="bgImg"></image>
        </div>
        <form-info></form-info>
        <loan-step></loan-step>
        <div class="box-bot">
            <div class="condition">
                <text class="con-h">申请条件</text>
                <text class="con-text">1、18-60周岁，中国国籍(不含港澳）。</text>
                <text class="con-text">2、车辆购买不超过10年(以首次上牌登记日为准)，行驶里程小于15万公里。</text>
            </div>
            <advs></advs>
            <div class="desc">
            <text class="desc-t">说明：车抵贷是京东金融与合作机构联合推出的车辆抵押贷款服务，将推荐多个合作机构为您服务，线下贷款服务由第三方合作商家提供。</text>
            </div>
            <div class="desc">
            <text class="desc-app">苹果免责声明</text>
            <text class="desc-t">1、本次活动由京东金融发起，与Apple.cn无关。</text>
            <text class="desc-t">2、苹果公司不是本活动的赞助商且没有以任何形式参与活动。</text>
            <text class="desc-t">3、本活动仅限17岁以上用户参加。</text>
            </div>
            <div class="jr-make">
                <text class="jr-make-text">京东金融出品</text>
            </div>
        </div>
  </scroller>  
</template>
<script>
  import formInfo from './comps/formInfo.vue'
  import loanStep from './comps/loanStep.vue'
  import advs from './comps/advs.vue'
  export default {
    data () {
      return {
          bgImg:require('./img/bg.png')
      }
    },
    components:{
       formInfo,
       loanStep,
       advs
    }
  }
</script>
<style scoped>
.box{
    /* background-color:rgb(244,244,246); */
   position: absolute;
   background-color:#fff;
}
 .info-tips{
     width:750px;
     height:72px;
     background-color:#FFF7EA;
 }
 .tips-text{
     font-family: PingFangSC-Regular;
     font-size: 28px;
     color: #EA7C31;
     line-height: 72px;
     padding-left:32px;
 }
 .bg-img{
     width:750px;
     height:457px;
 }
 .box-bot{
     background-color:#F5F5F5;
 }
 .condition{
     width:750px;
     height:305px;
     background-color:#fff;
     padding-top:20px;
     padding-left:32px;
     /* margin-right:32px; */
 }
 .con-h{
     font-family: PingFangSC-Medium;
     font-size: 40px;
     color: #000000;
 }
 .con-text{
     font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #333333;
    line-height: 40px;
    margin-top:10px;
 }
 .desc{
     background-color:#F5F5F5;
     margin:32px;
 }
 .desc-app{
     font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #999999;
    line-height: 49px;
 }
 .desc-t{
     font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #999999;
    line-height: 38px;
 }
 .jr-make{
      align-items: center;
      margin:32px;
 }
 .jr-make-text{
     font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #DDDDDD;
 }
</style>
