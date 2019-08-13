/*
 * @Author: yhw.yinhongwei 
 * @Date: 2019-03-18 11:46:26 
 * @Last Modified by: yhw.yinhongwei
 * @Last Modified time: 2019-04-17 19:03:04
 */
<template>
   <div :class="['tag-coupon', ismargin ? '' : 'mt', ispadding ? 'plr10' : '']" :style="bgColor">
        <scroller class="scroller" scroll-direction="horizontal" show-scrollbar="false">
            <div :class="['tag-row', idx==currentTag ? 'tag-hover1' : '']" @click="touchSwitch(item, idx)" v-for="(item, idx) in datas" :key="item.id">
                <text :class="['tag-txt', idx==currentTag ? 'tag-hover2' : '']">{{item.tagName}}</text>
            </div>
        </scroller>
        <list-coupons :imgRowNum="imgRowNum" :contHeight="contHeight" ref="listcoupons0"></list-coupons>
    </div>
</template>
<style scoped>
.fnt36 {
    font-size: 36px;
}
.layout1 {
    flex-direction: row;
    align-items: center;
    background-color: transparent;
}
.block {
    align-items: center;
    justify-content: center;
}
.mt {
    margin-top: 10px;
}
.plr10 {
    padding-right: 10px;
    padding-left: 10px;
}
.tag-coupon{
    width:750px;
    justify-content: center;
    align-items: center;
}
.scroller {
    width: 750px;
    height: 80px;
    /* z-index: 9998; */
    background-color: #ffffff;
    flex-direction: row;
}
.tag-row {
    width:250px;
    height: 80px;
    align-items: center;
    justify-content: center;
    border-bottom-color: #d2d2d2;
    border-bottom-width: 2px;
}
.tag-hover1 {
    border-bottom-color: #ff0000;
    border-bottom-width: 2px;
}
.tag-txt {
    font-size: 26px;
    width:250px;
    height: 79px;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 79px;
}
.tag-hover2 {
    color:#ff0000;
}
</style>
<script>
const modal = weex.requireModule('modal')
const animation = weex.requireModule('animation')
import listCoupons from './listCoupons.vue'

export default {
    data () {
      return {
        currentTag: 0, // 当前tag项
        currentData: [], // 当前标签下的内容
        width: 500,
        height: 300,
        top: 0,
        templetId: 0, // 标签模板的ID
        contHeight:'0px',
      }
    },
    props:['data'],
    created() {
        // const { deviceHeight, deviceWidth,platform }  = weex.config.env;
        // const Height=deviceHeight*750/deviceWidth
        // let pageHeight=296
        // this.contHeight=Height-pageHeight+'px'

        if (this.datas && this.datas[0].couponList && this.datas[0].couponList.length > 0) {
            var hi = this.imgWH(this.datas[0].couponList[0].imageUrl, this.imgRowNum)
            this.contHeight = hi.height
        }
    },
    computed:{
        datas() {
            var tag = this.data.tagCouponTemplet.tagCouponList
            this.templetId = this.data.templetId
            
            if (tag.length > 0) {
                this.currentData = tag[0].couponList
                var temp = [] // 指定列的数据集
                if (this.imgRowNum=3) {
                    for(var i=0;i<this.currentData.length;i+=3) {
                        temp.push([this.currentData[i] || {}, this.currentData[i+1] || {}, this.currentData[i+2] || {}])
                    }
                } else if (this.imgRowNum==2) {
                    for(var i=0;i<this.currentData.length;i+=3) {
                        temp.push([this.currentData[i] || {}, this.currentData[i+1] || {}])
                    }
                } else {
                    temp = this.currentData
                }
                this.currentData = temp
            }
            return tag.length > 8 ? tag.splice(0,8): tag
        },
        maskStyle() {
            const { width, height, top } = this;
            const { deviceHeight, deviceWidth, platform } = weex.config.env;
            const _deviceHeight = deviceHeight || 1334;
            const isWeb = typeof (window) === 'object' && platform.toLowerCase() === 'web';
            const navHeight = isWeb ? 0 : 130;
            const pageHeight = _deviceHeight / deviceWidth * 750 - navHeight;
            return {
                width: width + 'px',
                height: height + 'px',
                left: (750 - width) / 2 + 'px',
                top: (top || (pageHeight - height) / 2) + 'px',
            }
        },
        imgRowNum(){
           return this.data.tagCouponTemplet.prodRowNum || 3
        },
        ismargin(){
           return this.data.tagCouponTemplet.templateMargin==1?true:false
        },
        ispadding(){
           return this.data.tagCouponTemplet.templatePadding==1?true:false
        },
        isTitle(){
           return this.data.displayName?true:false
        },
        bgColor(){
           return {backgroundColor:this.data.templateBgColor || 'transparent'}
        }
    },
    components:{
        listCoupons
    },
    mounted() {
        this.$refs.listcoupons0.getData(this.currentData, this.templetId)
    },
    methods:{
        touchSwitch (item, index) {
            this.currentTag = index
            this.$refs.listcoupons0.getData(item, this.templetId)
        },
    }
  }
</script>