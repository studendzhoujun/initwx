/*
 * @Author: zhouJun 
 * @Date: 2018-03-13 17:01:26 
 * @Last Modified by: yhw.yinhongwei
 * @Last Modified time: 2019-04-08 14:38:28
 */
<template>
  <div @click="productdetails" :class="['product','ismargin']">
     <div class="product-image">
        <image class="product-image-item" :src="item.goodsBean.skuThumbImgUrl" :placeholder="defalutBg"></image>
        <div v-if="timeover||productstate=='3'" class="time-over"></div>
        <text v-if="timeover||productstate=='3'" class="time-over-text">已结束</text>
     </div>
     <div class="product-info-parent">
         <div class="product-info-name">
          <image v-if="item.isBBC=='N'" class="product-info-tag-img" :src="require('../img/brand-self.png')"></image>
          <text v-if="item.isBBC=='N'" class="product-info-name-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.goodsBean.skuName}}</text>
          <text v-else class="product-info-name-text">{{item.goodsBean.skuName}}</text>
           <text class="product-info-pntitle-text">{{item.promoWord}}</text>
         </div>
          <div class="product-info-flag">
            <image v-if="item.goodsType=='1'&&productstate!=='3'" class="product-info-flag-img" :src="require('../img/brand-rush.png')"></image>
            <image v-if="item.goodsType=='2'&&productstate!=='3'" class="product-info-flag-img" :src="require('../img/brand-tuan.png')"></image>
            <timer v-if="item.goodsBean.priceBean.endDate&&productstate!=='3'" :expiresTime="item.goodsBean.priceBean.endDate" @timeEnd="gogo"></timer>
            <!--<div class="product-info-fanli">
                <text class="product-info-fantext">返</text>
                <text class="product-info-fannum">最高返22.1国美币</text>
            </div>-->
           </div>
           <div class="product-price">
                <div class="product-price-left">
                  <text class="product-price-leftText">¥{{productPrice}}</text>
                </div>
                <div v-if="cartFlag==3||cartFlag==4" class="product-price-right nostart">
                    <text class="product-price-right-text nostarttext">立即抢购</text>
                </div>
                <div v-else class="product-price-rightcart">
                     <image :src="require('../img/brand-cart.png')" class="product-price-rightcarttext"></image>
                </div>
           </div>
           <div v-if="item.goodsType==1||item.goodsType==2" class="product-left-num">
               <text class="product-left-num-text">{{item.goodsBean.priceBean.remainNumDesc||item.goodsBean.priceBean.boughtNumDesc}}</text>
           </div>
     </div>
  </div>
</template>
<style scoped>
.product {
  width: 750px;
  height: 250px;
  flex-direction: row;
  background-color:#FFFFFF;
  margin-bottom:8px;
 /* border-width: 1px;
  border-style: solid;
  border-color: rgb(162, 217, 192);*/
}
.ismargin{
  width:722px
}
.product-image{
  width:250px;
  height:250px;
}
.product-image-item{
  width:250px;
  height:250px;
}
.time-over{
  width:140px;
  height:140px;
  background-color:#000000;
  opacity:0.6;
  position:absolute;
  border-radius:200px;
  left:55px;
  top:55px;
}
.time-over-text{
  color:#FFFFFF;
  font-size:28px;
  width:140px;
  height:140px;
  line-height:140px;
  text-align:center;
  position:absolute;
  top:55px;
  left:55px;
}
.product-info-parent{
  width:470px;
  height: 250px;
}
.product-info-name{
   height:100px;
   width:450px;
   padding-right:10px;
   margin-left:20px;
   margin-top:10px;
}
.product-info-pntitle-text{
    color:#F20C59;
    font-size:24px;
    position:absolute;
    bottom:0px;
    left:0;
    lines:1;
    text-overflow:ellipsis;
}
.product-info-tag{
  font-size:18px;
  width:80px;
  height:28px;
  line-height: 28px;
  color:#ff8484;
   /* align-items: center;
    justify-content: center; */
  border-width:1px;
  border-style:solid;
  border-color:#ff8484;
  border-radius: 5px;
  text-align:center;
  /* background-color:red; */
  position: absolute;
  left: 8px;
  top:10px;
}
.product-info-fanli{
  flex-direction:row;
}
.product-info-fantext{
  width:24px;
  height:24px;
  font-size:20px;
  color:#FFFFFF;
  background-image:linear-gradient(to bottom,#FA1E8C,#F20C59);
}
.product-info-fannum{
  height:24px;
  font-size:20px;
  color:#F20C59;
  border-style:solid;
  border-width:1px;
  border-color:#F20C59;
}
.product-info-timer{
  font-size:24px;
  color:#5B6066;
}
.product-info-tag-img{
  width:50px;
  height:25px;
  position: absolute;
  left: 0px;
  top: 6px;
}
.product-info-name-text{
  lines:2;
  font-size:25px;
  text-overflow:ellipsis;
  position: absolute;
  left: 0;
  top:4px;
}
.product-price{
  flex-direction: row;
  margin-left:20px;
  align-items:center;
  /*background-color:yellow*/
}
.product-price-left{
  width:300px;
}
.product-price-leftText{
   font-size: 35px;
   color: #F20C59;
}
.product-price-right{
   width:130px;
   height: 48px;
   border-radius:48px;
   background-color:#F20C59;
   justify-content:center;
   align-items:center;
}
.nostart{
  background-color:#FF80AA;
}
.nostarttext{
  opacity:0.3;
}
.product-price-right-text{
  font-size:26px;
  color:#FFFFFF;
}
.product-price-rightcart{
  width:66px;
  height:66px;
  border-radius:66px;
  justify-content:center;
  align-items:center;
  background-color:#F20C59;
  margin-left:60px;
}
.product-price-rightcarttext{
  width:40px;
  height:40px;
}
.product-left-num-text{
  font-size:20px;
  color:#92969A;
  margin-left:20px;
  /*background-color:red;*/
}
.product-info-flag{
   width:424px;
   height:30px;
   margin-top:10px;
   margin-left:20px;
   flex-direction:row;
   /*background-color:blue*/
}
.product-info-flag-img{
  width:70px;
  height:26px;
  margin-right:5px;
}
.whundred{
    width:110px;
}
</style>
<script>
import timer from './timer.vue'
const page = weex.requireModule('PageManagerModule')
const modal = weex.requireModule('modal')
export default {
  data() {
    return {
      timeover:false,
    }
  },
  props:{
        item:{
            type:Object
        },
        ismargin:{
          type:Boolean
        },
        cartFlag:{
          type:Number
        }
  },
  computed:{
    productPrice(){
      const PRICETYPE = ['skuPrice','skuRushBuyPrice','skuGrouponBuyPrice']
      // 0 普通价格 1 抢购价格 2 团购价格
      const type = this.item.goodsType
      return this.item.goodsBean.priceBean[PRICETYPE[type]]
    },
    productstate(){
      const type = this.item.goodsType
      if(type=='1'){
        return this.item.goodsBean.priceBean.rushBuyState
      }else if(type=='2'){
        return this.item.goodsBean.priceBean.saleState
      }else{
        return '0'
      }
    }
  },
  components:{
    timer
  },
  methods: {
    gogo(){
      this.timeover=true
    },
    goBuy(){
       modal.toast({
        message:'立即购买',
        duration:1
      })
    },
    goCart(){
      modal.toast({
        message:'去购物车',
        duration:1
      })
    }
  }
}
</script>