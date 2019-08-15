<template>
  <div class="loan-step">
      <text class="step-h">贷款流程</text>
      <div class="step-box">
        <div class="step-item">
            <image :src="cddF" class="item-img"></image>
            <text class="item-t">线上申请</text>
        </div>
        <div class="step-item"><text class="dot">...</text></div>
         <div class="step-item">
            <image :src="cddS" class="item-img"></image>
            <text class="item-t">客服联系</text>
        </div>
         <div class="step-item"><text class="dot">...</text></div>
         <div class="step-item">
            <image :src="cddT" class="item-img"></image>
            <text class="item-t">门店受理</text>
        </div>
         <div class="step-item"><text class="dot">...</text></div>
         <div class="step-item">
            <image :src="cddL" class="item-img"></image>
            <text class="item-t">贷款发放</text>
        </div>
      </div>
  </div>
</template>
<style scoped>
  .loan-step{
      margin-left:30px;
      margin-right:30px;
      background-color:#fff;
      padding-bottom:55px;
  }
  .step-h{
      font-family: PingFangSC-Medium;
      font-size: 40px;
      color: #000000;
      margin-top:60px;
  }
  .step-box{
      flex-direction: row;
      align-items: center;
      justify-content:space-around;
  }
  .step-item{
       align-items: center;
      justify-content:space-around;
  }
  .dot{
      color:#ccc;
      height:100px;
  }
  .item-img{
      width:120px;
      height:120px;
      margin-bottom:16px;
  }
  .item-t{
    font-family: PingFangSC-Medium;
    font-size: 28px;
    color: #333333;
    letter-spacing: 0;
  }
</style>
<script>
  export default {
    data () {
      return {
        cddF:require('../img/cdd1.png'),
        cddS:require('../img/cdd2.png'),
        cddT:require('../img/cdd3.png'),
        cddL:require('../img/cdd4.png'),

      }
    },
    methods:{
     
    }
  }
</script>
