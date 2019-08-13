/*
 * @Author: zhouJun 
 * @Date: 2018-03-20 15:36:13 
 * @Last Modified by: yhw.yinhongwei
 * @Last Modified time: 2019-04-15 10:16:40
 */
<template>
    <div class="wrap" :style="{'height': contHeight}">
        <div v-if="this.refreshing" class="center">
            <image src="https://css.gomein.net.cn/plus/style/shop_search_list/images/loading.210c9c0ad5.gif" style="width:24px;height:24px"></image>
            <text class="indicator-text">&nbsp;&nbsp;正在加载中 ...</text>
        </div>
        <div v-if="!this.refreshing" ref="listWrap" :style="{'height':contHeight}">
            <waterfall @scroll="listScrollEvent" :class="['list',showbot?'list-bot':'']" :style="{'height':contHeight,'background-color': switchListIconFlag==1 ? '#f2f2f2' : '#ffffff'}" @loadmore="fetch" loadmoreoffset="100" column-gap="10" column-width="300" :column-count="switchListIconFlag==1?2:1">
                <cell class="cell" v-for="(item, index) in lists" :key="'list'+index" :ref="'goodsItem'+index">
                   <div class="good-item" @click="gotoViewClicked(item)" :ref="'goodItem'+index">
                        <div v-if="switchListIconFlag==2" class="good-item-content">
                            <image :src="item.productImgURL | imgUrl" class="good-pic" :placeholder="defalutBg"></image>
                            <div class="good-pannel">
                                <div class="title-parent">
                                  <text class="good-title">{{item.isBbc == 'Y'? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : ""}}{{item.goodsName}}</text>
                                </div>
                                <image v-if="item.isBbc =='Y'" :src="ziyingIcon" class="icon-ziying"></image>
                                <div class="good-price">
                                   <text class="good-price-t">￥</text>
                                   <text class="good-price-b">{{item.highestSalePrice}}</text>
                                </div>
                                <text class="good-eva">{{item.evaluatecount}}人评价</text>
                            </div>
                        </div>
                        <div v-if="switchListIconFlag==1" class="good-item-content-two">
                            <image :src="item.productImgURL | imgUrl" class="good-pic-two" :placeholder="defalutBg"></image>
                            <div class="good-pannel-two">
                                <div class="title-parent-two">
                                    <text class="good-title-two">{{item.isBbc =='Y'? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : ""}}{{item.goodsName}}</text>
                                </div>
                                <image v-if="item.isBbc =='Y'" :src="ziyingIcon" class="icon-ziying-two"></image>
                                <div class="good-price-two">
                                   <text class="good-price-t">￥</text>
                                   <text class="good-price-b">{{item.highestSalePrice}}</text>
                                </div>
                            </div>
                        </div>
                    </div>
                </cell>
                <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
                    <loading-indicator class="indicator"></loading-indicator>
                    <text class="indicator-text">加载中 ...</text>
                </loading>
            </waterfall>
        </div>
    </div>
</template>
<style scoped>
    .wrap {
        width: 750px;
    }
    .top-nav {
        height: 80px;
        background-color: #ffffff;
        flex-direction: row;
    }
    .top-nav-item {
        width: 187px;
        align-items: center;
        justify-content: center;
    }
    .nav-title {
        color: #7A7F85;
        font-size: 28px;
    }
    .hover1 {
        border-bottom-color: #F20C59;
        border-bottom-width: 1px;
    }
    .hover2 {
        color: #F20C59;
    }

    /*商品列表*/
    .icon-ziying, .icon-ziying-two {
        width:48px;
        height:24px;
        position: absolute;
        top:15px;
        left:0px;
    }
    .icon-ziying-two {
        top: 3px;
    }
    .icon-buy, .icon-buy-two {
        width: 66px;
        height: 66px;
        position: absolute;
        top: 155px;
        right: 25px;
    }
    .icon-buy-two {
        top: 75px;
        right: 0px;
    }
    .list {
        margin-top: 10px;
       /* height:1000px;*/
    }
    .list-bot{
        padding-bottom:100px;
    }
    .good-item {
        /*height: 250px;*/
        margin-bottom: 10px;
    }
    .good-item-content {
        flex-direction: row;
        justify-content: space-between;
        background-color: #ffffff;
    }
    .good-item-content-two {
        margin-bottom: 10px;
        background-color: #ffffff;
    }
    .good-pic {
        width: 240px;
        height: 240px;
        margin-right: 10px;
    }
    .good-pic-two {
        width: 370px;
        height: 370px;
    }
    .good-pannel {
        border-top-width: 1px;
        border-top-color: #ebeced;
        width: 480px;
        height: 240px;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-left:20px;
    }
    .good-pannel-two {
        margin-top: 10px;
        width: 326px;
        height: 160px;
        margin-left:20px;
    }
    .title-parent{
        width:453px;
        height:65px;
    }
    .good-title {
        color: #262C32;
        font-size:25px;
        lines:2;
        text-overflow:ellipsis;
    }
    .title-parent-two{
         width: 326px;
         height: 65px;
    }
    .good-title-two {
        font-size: 25px;
        color: #333333;
        text-overflow: ellipsis;
        lines: 2;
        /*overflow: hidden;*/
    }
    .good-other {
        height: 50px;
    }
    .good-price{
        width: 500px;
        flex-direction: row;
        align-items:center;
        margin-top:60px;
    }
    .good-price-t{
        font-size: 34px;
        color: #F20C59;
    }
    .good-price-b{
        font-size: 34px;
        color: #F20C59;
    }
    .good-eva{
        color:#919599;
        font-size:22px;
        margin-left:5px;
        margin-top:1px;
    }
    .good-price-two {
        width: 500px;
        font-size: 34px;
        color: #F20C59;
    }
    .good-price-two {
        width:300px;
        margin-top:30px;
        align-items:center;
        flex-direction: row;
    }
    .good-people {
        width: 500px;
        font-size: 22px;
        color: #919599;
        margin-top: 10px;
    }

    
    /*加载指示器*/
    .refresh, .loading {
        width: 750px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .loading {
        margin-top: 10px;
    }
    .indicator-text {
        color: #888888;
        font-size: 30px;
        text-align: center;
    }
    .indicator {
        height: 30px;
        width: 30px;
        color: #888888;
        margin-right: 10px;
    }
    .center {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 750px;
        height: 500px;
        margin-top: 300px;
    }
</style>
<script>
    let navigator = weex.requireModule('navigator');
    let modal = weex.requireModule('modal');
    let stream = weex.requireModule('stream');
    let dom = weex.requireModule('dom');
    let animation = weex.requireModule('animation');
    import {http,isLive,getParams,isUat} from '../utils/index.js'
    export default {
        props: {
            useDefaultReturn: {
                type: Boolean,
                default: true
            },
            isShowTopNav: {
                type: Boolean,
                default: true
            },
            searchKey: {
                type: String,
                default: ''
            },
            contHeight:{
                type:Number,
                default:0
            }
        },
        data() {
            return {
                height: WXEnvironment.deviceHeight,
                ziyingIcon: require('../img/brand-self.png'),
                loadinging: false,
                lists: [
                ],
            }
        },
        computed:{
            switchListIconFlag(){
                return this.$store.state.switchListIconFlag
            },
            refreshing(){
                return this.$store.state.refreshing
            },
            showbot(){
               return this.$store.state.bottomList
            }
        },
        filters:{
            imgUrl(value){
                return value==''?require('../img/defaut_bg.png'):value
            }
        },
        methods: {
            // 请求当前tab的数据
            getData(index){
                console.log(`当前tab为${index}的数据`)
                if(this.lists.length!==0) return
                let merchantId=getParams(weex.config.bundleUrl,'shopKey')
                const SORT=[0,6,5,3]
                let sortBy=SORT[index]
                let currentPage=1
                let HTTP=isUat()?'http':'https'
                this.$store.commit('addPageIndex',index)                    
                http({
                //:`/api/product?merchantId=${merchantId}&sortBy=${sortBy}&currentPage=${currentPage}`,
                // php接口
                 url:`${HTTP}://m.${isUat()?'atguat':'gome'}.com.cn/shop/ajaxGoodsList?merchantId=${merchantId}&sortBy=${sortBy}&currentPage=1`,
                // body:{merchantId:80007141,sortBy:3,currentPage:1}
                // isLoading:true,
                }).then(data=>{ 
                    console.log(data)
                    let goods= data.data.goodsList
                    this.lists=goods
                    // this.$store.commit('addPageIndex',index)                    
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 回到顶部
            gotoTop () {
                let ref = this.$refs.goodsItem0[0];
                dom.scrollToElement(ref, {})
            },
            // 滑动监测
            listScrollEvent (event) {
               if (event.contentOffset.y<-100) {
                    this.$store.state.goTop = true;
                } else {
                    this.$store.state.goTop = false;
                }
            },
            // 跳转购买
            gotoBuy (id) {
                modal.toast({ message: '到购物车去', duration: 1 })
            },
            // 跳转详情页
            gotoViewClicked (item) {
                let HTTP=isUat()?'http':'https'
                let url = `${HTTP}://item.m.${isUat()?'atguat':'gome'}.com.cn/product-${item.goodsNo}-${item.skuID}.html`
                weex.requireModule('PageManagerModule').jump(url)
            },
            // 获取接口数据
            fetch (event) {
                let tabIndex=this.$store.state.tabIndex
                // modal.toast({ message: `加载更多tab=${tabIndex}`, duration: 1 });
                let merchantId=getParams(weex.config.bundleUrl,'shopKey')
                const SORT=[0,6,5,3]
                let sortBy=SORT[tabIndex]
                let currentPage=this.$store.state.pageIndex[tabIndex]
                let isNodata=this.$store.state.isNodata[tabIndex]
                // console.log(this.$store.state.pageIndex)                 
                if(isNodata){
                    return false
                }
                let HTTP=isUat()?'http':'https'
                http({
                // url:`/api/product?merchantId=${merchantId}&sortBy=${sortBy}&currentPage=${currentPage}`,
                url:`${HTTP}://m.${isUat()?'atguat':'gome'}.com.cn/shop/ajaxGoodsList?merchantId=${merchantId}&sortBy=${sortBy}&currentPage=${currentPage}`,
                // isLoading:true,
                }).then(data=>{ 
                    console.log(data)
                    let goods= data.data.goodsList
                    if(goods.length<14){
                      this.$store.commit('isNoData',tabIndex)                    
                    }
                    this.lists.push(...goods)         
                    this.$store.commit('addPageIndex',tabIndex)                    
                }).catch((err)=>{
                    console.log(err)
                })
                
            },
            // 下拉刷新
            onrefresh (event) {

            },
            // 加载更多
            onloading (event) {
               this.fetch();
            }
        }
    }
</script>