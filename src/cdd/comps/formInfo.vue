<template>
  <div class="form">
     <div class="form-item">
         <text class="item-name">姓名</text>
         <text class="item-value">{{name | toStar(0,2)}}</text>
     </div>
       <div class="form-item">
         <text class="item-name">联系电话</text>
         <text class="item-value">{{phone | toStar(2,7)}}</text>
      </div>
       <div class="form-item">
         <text class="item-name">所在城市</text>
         <text class="item-value">{{city}}</text>
      </div>
      <div class="form-item dashed">
         <text class="item-name">车辆是否有贷款</text>
         <div class="item-loan">
             <div @click="change(true)" class="loan-box">
                <image class="loan-img" :src="isLoan?loanImgActive:loanImg"></image>
                <text class="loan-ml">有</text>
             </div>
              <div @click="change(false)" class="loan-box margL">
                <image class="loan-img" :src="isLoan?loanImg:loanImgActive"></image>
                <text class="loan-ml">没有</text>
             </div>
         </div>
      </div>
      <div @click="agree" class="proto">
        <image class="pro-img" :src="isOk?loanImgActive:proImg"></image>
        <text class="pro-t loan-ml">我已阅读并同意签署</text>
        <text class="pro-t col">《用户信息授权协议》</text>
      </div>
      <div @click="apply" :class="[isOk?'btn':'btn-disabled']">
        <text class="btn-text">立即申请</text>
      </div>
  </div>
</template>
<style scoped>
   .form {
       width:702px;
       height:787px;
       background-color:#FFF;
       /* margin:-100px auto 0; */
       margin-left:24px;
       margin-top:-100px;
       border-radius:20px;
       /* margin-bottom:100px; */
       box-shadow: 0 10px 32px 0 rgba(202,202,202,0.54);
   }
   .form-item{
       flex-direction: row;
       border-bottom-style:solid;
       border-bottom-color:#EEE;
       border-bottom-width:1px;
       width:654px;
       height:132px;
       margin-left:24px;
       justify-content: space-between;
       align-items:center;
   }
   .item-name{
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: #000000;
        letter-spacing: 0;
   }
   .item-value{
       font-family: PingFangSC-Regular;
       font-size: 32px;
       color: #999999;
       letter-spacing: 0;
   }
   .item-loan{
       flex-direction: row;
   }
   .loan-box{
       flex-direction: row;
       justify-content: center;
       align-items:center;
   }
   .margL{
       margin-left:40px;
   }
   .dashed{
       border-bottom-style:dashed;
       border-bottom-color:#798296;
       border-bottom-width:1px;
       position:relative;
   }
   .dashed::before {
      content: '';
      width:18px;
      height: 18px;
      background-color: #f5f5f5;
      border-radius: 50%;
      position: absolute;
      right: -30px;
      bottom:-10px;
    }
     .dashed::after {
      content: '';
      width:18px;
      height: 18px;
      background-color: #f5f5f5;
      border-radius: 50%;
      position: absolute;
      left: -30px;
      bottom:-10px;
    }
   .loan-img{
       width:28px;
       height:28px;
   }
   .loan-ml{
     margin-left:10px;
   }
   .proto{
     flex-direction: row;
     height:116px;
     width:750px;
     justify-content: center;
     align-items: center;
   }
   .pro-img{
     width:28px;
     height:28px;
   }
   .pro-t{
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #999999;
      letter-spacing: 0;
      line-height: 33px;
   }
   .col{
     color:#333333;
   }
   .btn{
     width:638px;
     height:100px;
     /* background-image: linear-gradient(to right, #FFA717, #FF720C);
      */
      background-color:rgba(255,156,21,1);
     border-radius:5px;
     margin-left:32px;
     justify-content: center;
     align-items: center;
   }
   .btn-text{
      font-family: PingFangSC-Medium;
      font-size: 36px;
      color: #FFFFFF;
   }
   .btn-disabled {
     border-radius: 4px;
     width:638px;
     height:100px;
     border-radius:5px;
     margin-left:32px;
     background-color:rgba(255,156,21,0.4);
     justify-content: center;
     align-items: center;
   }
</style>
<script>
  export default {
    data () {
      return {
        name:'小浣熊',
        phone:'15712827577',
        city:'北京',
        loanImgActive:require('../img/cdd-active.png'),
        loanImg:require('../img/cdd-default.png'),
        proImg:require('../img/pro-img.png'),
        isOk:false,
        isLoan:false,
      }
    },
    filters:{
       toStar(value,st,end){
           let ns=value.split('');
            st=st||0
            end=end||ns.length
            for(let i=0;i<ns.length;i++){
                if(i>st&&i<end){
                ns[i]="*"
                }
            }
            return ns.join('')
        }
    },
    methods:{
      change(value){
         this.isLoan=value
      },
      agree(){
         this.isOk=this.isOk?false:true
      },
      apply(){
        if(this.isOk){
           var modal=weex.requireModule('modal')
            // modal.toast({
            //   message:'恭喜你申请成功',
            //   duration:3
            // })
            var modal = weex.requireModule('modal')
            modal.alert({
              message: '恭喜你申请成功',
              okTitle: '确认'
            }, function () {
              console.log('alert callback')
            })
        }
      }
    }
  }
</script>
