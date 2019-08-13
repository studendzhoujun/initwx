/*
 * @Author: zhouJun 
 * @Date: 2018-03-13 17:00:54 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-09-26 11:18:06
 */
<template>
  <div @click="productdetails" :class="['product','ismargin',isHeigh?'product-h':'',idx%2==1?'marginleft10':'']">
     <div class="product-image">
        <image class="product-image-item" :src="productImg" :placeholder="defalutBg"></image>
        <div  v-if="item.goodsType!==0&&productstate!=='3'" class="product-item-tag">
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
           <div :class="[isHeigh?'product-price-h':'product-price']">
                <div class="product-price-left">
                  <text class="product-price-leftText">¥{{productPrice}}</text>
                </div>
                <div v-if="!isHeigh" class="product-price-right">
                    <image :src="require('../img/brand-cart.png')" class="product-price-right-cart"></image>
                </div>
                 <div v-else class="product-price-right-button">
                    <text class="product-price-right-button-text">立即购买</text>
                </div>
           </div>
     </div>
  </div>
</template>
<style scoped>
.product {
  width: 356px;
  height: 550px;
  background-color:#FFFFFF;
  margin-bottom:8px;
  /*border-width: 1px;
  border-style: solid;
  border-color: rgb(162, 217, 192);*/
}
.marginleft10{
  margin-left:9px;
}
.product-h{
  height:586px;
}
.ismargin{
  width:356px;
}
.product-image{
  width:356px;
  height:356px;
}
.product-image-item{
  width:356px;
  height:356px;
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
    width:356px;
    height:356px;
}
.time-over{
  position:absolute;
  width:140px;
  height:140px;
  background-color:#000000;
  opacity:0.6;
  border-radius:140px;;
  left:108px;
  top:108px;
}
.time-count-mask{
  width:356px;
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
  left:100px;
}
.time-over-text{
  color:#FFFFFF;
  font-size:28px;
  position:absolute;
  width:140px;
  height:140px;
  top:108px;
  left:108px;
  line-height:140px;
  text-align:center;
}
.product-info-parent{
  width:356px;
  height: 190px;
}
.product-info-name{
   width:326px;
   height:95px;
   margin-left:14px;
   margin-top:10px;
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
    color:#92969A;
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
  top: 5px;
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
  margin-left:14px;
  height:80px;
  width:340px;
  align-items:center;
  justify-content:space-between;
}
.product-price-h{
  margin-left:14px;
  height:80px;
  width:340px;
  justify-content:space-between;
}
.product-price-leftText{
   font-size: 34px;
   color: #F20C59;
}
.product-price-right{
   width:66px;
   height:66px;
   border-radius:66px;
   background-color:#F20C59;
   margin-right:15px;
   justify-content:center;
   align-items:center;
}
.product-price-right-cart{
   width:40px;
   height:40px;
}
.product-price-right-button{
   width:322px;
   height:52px;
   border-radius:52px;
   margin-top:10px;
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
.product-price-right-button-text{
  font-size:26px;
  color:#FFFFFF;
}
</style>
<script>
import timer from './timer.vue'
const modal =weex.requireModule('modal')
export default {
  data() {
    return {
    //   tagImgOne:require('../img/hot-tags_1.png'),
    //   tagImgTwo:require('../img/hot-tags_2.png'),
    //   tagImgThr:require('../img/hot-tags_3.png'),
    //   tagImg:require('../img/hot-tags_4.png'),
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
        cartFlag:{
          type:Number
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
    isHeigh(){
      return this.cartFlag==3||this.cartFlag==4?true:false
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
    },
    productImg(){
      return this.item.goodsBean.skuThumbImgUrl.replace('_160.','_360.')
    }
  },
  components:{
    timer
  },
  methods: {
    gogo(){
      this.timeover=true
    },
    goCart(){
       modal.toast({
         message:'加入购物车',
         duration:1
       })
    }
  }
}
</script>