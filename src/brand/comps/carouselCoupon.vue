/*
 * @Author: yhw.yinhongwei 
 * @Date: 2019-03-18 11:46:26 
 * @Last Modified by: yhw.yinhongwei
 * @Last Modified time: 2019-04-24 20:18:11
 */
<template>
   <div :class="['carousel-coupon', ispadding ? 'plr10' : '']" :style="bgColor">
        <!-- <div class="coupon-head layout1" v-if="isTitle">
           <div class="line"><text>{{data.displayName}}</text></div>
           <div class="txr" @click="go('https://m.gome.com.cn/coupons_center.html')"><text>更多></text></div>
        </div> -->
        <floor-title :isTitle="isTitle" :titleData="data" :ismargin="ismargin" :ispadding="ispadding"></floor-title>
        <slider :style="imgWH(datas[0] && datas[0][0] && datas[0][0].imageUrl || '', 2, true)" interval="3000" auto-play="true">
            <div class="layout1" v-for="(item, idx) in datas" v-bind:key="idx" :style="imgWH(item[0].imageUrl, 2, true)">
                <div>
                    <image :resize="contain" :placeholder="placeholderImg" :style="imgWH(item[0].imageUrl, 2)" 
                    :src="item[0].imageUrl"
                    :class="[couponState(item[0].fetchState) ? 'mask-img': '']" 
                    @click="onStartReceive(item[0].couponParam, 'carouselCouponTemplet', idx*2)"></image>
                    <div v-if="couponState(item[0].fetchState)" class="mask-layer" :style="imgWH(item[0].imageUrl, 2)">
                        <image :resize="contain" class="mask-content" :src="couponState(item[0].fetchState)" @click="couponStateUse(item[0])"></image>
                    </div>
                </div>
                <div>
                    <image :resize="contain" :placeholder="!!item[1].couponParam ? placeholderImg : ''" 
                    :style="imgWH(item[0].imageUrl, 2)" 
                    :class="[couponState(item[1].fetchState) ? 'mask-img': '']"
                    :src="item[1].imageUrl" @click="onStartReceive(item[1].couponParam, 'carouselCouponTemplet', idx*2+1)"></image>
                    <div v-if="couponState(item[1].fetchState)" class="mask-layer" :style="imgWH(item[0].imageUrl, 2)">
                        <image :resize="contain" class="mask-content" :src="couponState(item[1].fetchState)" @click="couponStateUse(item[1])"></image>
                    </div>
                </div>                
            </div>
        </slider>
        <coupon-captcha v-if="show" :codeUrl="codeUrl" :couponParam="couponParam" :tpl="tpl" :row="row" />
    </div>
</template>
<style scoped>
.layout1 {
    flex-direction: row;
    align-items: center;
    background-color: transparent;
}
.carousel-coupon{
    width:750px;
    justify-content: center;
    align-items: center;
}
.mt {
    margin-top: 10px;
}
.plr10 {
    padding-right: 10px;
    padding-left: 10px;
}
.coupon-head {
    width: 750px;
    height: 60px;
    border-bottom-color: #888888;
    border-bottom-width: 1px;
    margin-bottom: 20px;
}
.line {
    border-left-color: #FF0000;
    border-left-width: 8px;
    padding-left: 10px;
    width: 650px;
}
.txr {
    text-align: right;
}
.block1 {
    align-items: center;
    justify-content: center;
}
.mask-img {
    opacity: 0.46;
}
.mask-layer {
  position: absolute;
  left: 0px;
  top: 0px;
  /* background-color: rgba(0, 0, 0, .5); */
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
}
.mask-content {
  width: 124px;
  height: 124px;
}
</style>
<script>
const modal = weex.requireModule('modal')
import floorTitle from './floorTitle.vue'
import couponCaptcha from './couponCaptcha.vue'

export default {
    data () {
      return {
        show: false,
        codeUrl: '',
        couponParam: '',
        tpl: 'carouselCouponTemplet',
        row: 0,
      }
    },
    props:['data'],
    created(){
    },
    computed:{
        datas(){
            var list = this.data.carouselCouponTemplet.couponList || [], temp = []
            for(var i=0;i<list.length;i+=2) {
                temp.push([list[i] || {}, list[i+1] || {}])
            }
            return temp
        },
        imgRowNum(){
            return this.data.carouselCouponTemplet.imgNum
        },
        ismargin(){
            return this.data.carouselCouponTemplet.templateMargin==1?true:false
        },
        ispadding(){
            var pd = this.data.couponFloorTemplet && this.data.couponFloorTemplet.templatePadding || null
            if (!!pd) {
                return pd==1?true:false
            } else {
                return false
            }
        },
        isTitle(){
            return this.data.displayName?true:false
        },
        bgColor(){
            return {backgroundColor:this.data.templateBgColor || 'transparent'}
        }
    },
    components:{
        floorTitle,
        couponCaptcha
    },
    mounted(){
    },
    methods:{
        closeLayer() {
            this.show = false
        },
        go(e){
            weex.requireModule('PageManagerModule').jump(e.scheme)
        }
    }
  }
</script>