/*
 * @Author: yhw.yinhongwei 
 * @Date: 2019-03-18 11:46:26 
 * @Last Modified by: yhw.yinhongwei
 * @Last Modified time: 2019-04-24 20:18:32
 */
<template>
    <div :class="['coupon-floor', ispadding ? 'plr10' : '']" :style="bgColor">
       <floor-title :isTitle="isTitle" :titleData="data" :ismargin="ismargin" :ispadding="ispadding"></floor-title>
       <!-- <div class="layout1">
            <div v-for="(item, idx) in datas" v-bind:key="idx">
                <image :placeholder="placeholderImg" :style="imgWH(item.imageUrl, imgRowNum, null, ispadding)" :src="item.imageUrl" @click="onStartReceive(item.couponParam, 'couponFloorTemplet', idx)"></image>
                <div v-if="couponState(item.fetchState)" class="mask-layer" :style="imgWH(item.imageUrl, imgRowNum)">
                    <image :resize="contain" class="mask-content" :src="couponState(item.fetchState)" @click="couponStateUse(item)"></image>
                </div>
            </div>
       </div> -->
       <waterfall class="morelist" :style="moreHeight" :column-count="imgRowNum" column-width="auto" column-gap="0" left-gap="0" right-gap="0">
            <cell class="block1" v-for="(item, idx) in datas" v-bind:key="idx">
                <image :placeholder="placeholderImg" :style="imgWH(item.imageUrl, imgRowNum, null, ispadding)" 
                :src="item.imageUrl" 
                :class="[couponState(item.fetchState) ? 'mask-img': '']"
                @click="onStartReceive(item.couponParam, 'couponFloorTemplet', idx)"></image>
                <div v-if="couponState(item.fetchState)" class="mask-layer" :style="imgWH(item.imageUrl, imgRowNum, null, ispadding)">
                    <image :resize="contain" class="mask-content" :src="couponState(item.fetchState)" @click="couponStateUse(item)"></image>
                </div>
            </cell>
        </waterfall>
       <coupon-captcha v-if="show" :codeUrl="codeUrl" :couponParam="couponParam" :tpl="tpl" :row="row" />
    </div>
</template>
<style scoped>
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

.layout1 {
    flex-direction: row;
    flex-wrap: wrap;
}
.morelist {
    width: 750px;
}

.coupon-floor{
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
.block1 {
    align-items: center;
    justify-content: center;
}
.mrg {
    margin-left: 15px;
    margin-right: 15px;
}
.txt {
    font-size: 26px;
    color: #ffffff;
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
        tpl: 'couponFloorTemplet',
        row: 0,
        // couponState: 'http://www.xxx.com/img/coupon1.png',//require('../img/coupon1.png'),
        moreHeight: {}
      }
    },
    props:['data'],
    created(){
    },
    computed:{
        datas(){
            var temp = this.data.couponFloorTemplet.couponList || []
            if (temp.length > 0) {
                var h = this.imgWH(temp[0].imageUrl, this.imgRowNum, null, this.ispadding)
                this.moreHeight = {
                    height: (Math.ceil(temp.length/this.imgRowNum) * (h.height.replace('px', ''))) + 'px'
                }
            }
            return temp
        },
        imgRowNum(){
           return this.data.couponFloorTemplet.prodRowNum
        },
        ismargin(){
           return this.data.couponFloorTemplet.templateMargin==1?true:false
        },
        ispadding(){
           return this.data.couponFloorTemplet.templatePadding==1?true:false
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
        }
    }
  }
</script>