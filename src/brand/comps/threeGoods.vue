/*
 * @Author: zhouJun 
 * @Date: 2018-03-13 17:01:42 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-09-26 11:19:22
 */
<template>
  <div @click="productdetails" :class="['product','ismargin',idx==0?'':'marginleft10']">
     <div class="product-image">
        <image class="product-image-item" :src="item.goodsBean.skuThumbImgUrl" :placeholder="defalutBg"></image>
        <div v-if="item.goodsType!==0&&productstate!=='3'" class="product-item-tag">
            <text class="product-item-tagtext">{{goodsTypeWords}}</text>
        </div>
        <div v-if="timeover || productstate=='3'" class="time-box">
           <div class="time-over"></div>
           <text class="time-over-text">已结束</text>
        </div>
        <div v-if="item.goodsBean.priceBean.endDate&&productstate!=='3'" class="time-count-mask"></div>
        <div v-if="item.goodsBean.priceBean.endDate&&productstate!=='3'" class="time-count">
             <timer v-if="item.goodsBean.priceBean.endDate" :expiresTime="item.goodsBean.priceBean.endDate" @timeEnd="gogo" :objstyle="objstyle"></timer>
        </div>
     </div>
     <div class="product-info-parent">
         <div class="product-info-name">
          <image v-if="item.isBBC=='N'" class="product-info-tag-img" :src="require('../img/brand-self.png')"></image>
          <text v-if="item.isBBC=='N'" class="product-info-name-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.goodsBean.skuName}}</text>
          <text v-else class="product-info-name-text">{{item.goodsBean.skuName}}</text>
          <text v-if="item.promoWord" class="product-info-pntitle-text">{{item.promoWord}}</text>
          <text v-else class="product-info-pntitle-text-tuan">{{item.goodsBean.priceBean.remainNumDesc||item.goodsBean.priceBean.boughtNumDesc}}</text>
         </div>
           <div class="product-price">
                <div class="product-price-left">
                  <text class="product-price-leftText">¥{{productPrice}}</text>
                </div>
                <div class="product-price-right">
                    <text class="product-price-right-text">立即购买</text>
                </div>
           </div>
     </div>
  </div>
</template>
<style scoped>
.product {
  width: 234px;
  height: 452px;
  background-color:#FFFFFF;
  margin-bottom:8px;
  /*border-width: 1px;
  border-style: solid;
  border-color: rgb(162, 217, 192);*/
}
.marginleft10{
  margin-left:9px;
}
.ismargin{
  width:234px;
}
.product-image{
  width:234px;
  height:234px;
}
.product-image-item{
  width:234px;
  height:234px;
}
.product-item-tag{
    width:110px;
    height:32px;
    background-color:#F30C59;
    position:absolute;
    justify-content:center;
    align-items:center;
    top:0;
    right:0
}
.product-item-tagtext{
    color:#FFFFFF;
    font-size:26px;
}
.time-box{
    position:absolute;
    left:0;
    top:0;
    width:234px;
    height:234px;
}
.time-over{
  position:absolute;
  width:140px;
  height:140px;
  background-color:#000000;
  opacity:0.6;
  border-radius:140px;
  left:50px;
  top:50px;
}
.time-count-mask{
  width:234px;
  height:38px;
  background-color:#000000;
  opacity:0.6;
  position:absolute;
  bottom:0px;
  left:0px;
}
.time-count{
  position:absolute;
  bottom:4px;
  left:25px;
}
.time-over-text{
  color:#FFFFFF;
  font-size:28px;
  position:absolute;
  top:100px;
  left:76px;
}
.product-info-parent{
  width:234px;
  height: 218px;
  /*background-color:red;*/
}
.product-info-name{
   width:220px;
   height:105px;
   margin-left:10px;
  /* background-color:blue;*/
}
.product-info-pntitle-text{
    color:#FF8802;
    font-size:24px;
    position:absolute;
    bottom:-3px;
    left:0;
    lines:1;
    text-overflow:ellipsis;
}
.product-info-pntitle-text-tuan{
    color:#B3B8BD;
    font-size:24px;
    position:absolute;
    bottom:-3px;
    left:0;
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
  top: 10px;
}
.product-info-name-text{
  lines:2;
  font-size:24px;
  text-overflow:ellipsis;
  position: absolute;
  color:#262C32;
 /* background-color:#ffff;*/
  left: 0;
  top:9px;
}
.product-price{
  height:100px;
  width:220px;
  margin-left:14px;
  justify-content:space-around;
 /* background-color:yellow;*/
}
.product-price-leftText{
   font-size: 28px;
   color: #F20C59;
}
.product-price-right{
   width:200px;
   height:48px;
   border-radius:48px;
   background-color:#F20C59;
   margin-right:15px;
   justify-content:center;
   align-items:center;
}
.product-price-right-text{
  font-size:26px;
  color:#FFFFFF;
}
</style>
<script>
import timer from './timer.vue'
const modal = weex.requireModule('modal')
export default {
  data() {
    return {
       timeover:false,
       objstyle:{
          color:'#FFFFFF',
       }
    }
  },
  props:{
        item:{
            type:Object
        },
        ismargin:{
          type:Boolean
        },
        idx:{
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
    goodsTypeWords(){
      const WORDS =['','抢购中','团购中']
      const type = this.item.goodsType
      return WORDS[type]
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
    }
  }
}
</script>