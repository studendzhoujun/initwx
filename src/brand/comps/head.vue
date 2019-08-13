/*
 * @Author: zhouJun 
 * @Date: 2018-03-09 11:04:35 
 * @Last Modified by: yinhongwei
 * @Last Modified time: 2019-05-29 11:46:22
 */
<template>
    <div ref="box" :class="[platform=='iOS' ? 'brand-head2' : 'brand-head']">
        <image :src="item.bgImgUrl" :class="[platform=='iOS' ? 'brand-head-backimg2' : 'brand-head-backimg']" :placeholder="defalutbgimg"></image>
        <div :class="[platform=='iOS' ? 'brand-head-backmask2' : 'brand-head-backmask']"></div>
        <!-- <div class="brand-head-backmask150"></div> -->
        <div :class="[platform=='iOS' ? 'brand-head-nav2' : 'brand-head-nav']">
            <div v-if="isInapp" @click="goback" class="brand-head-nav-arrow">
                <image class="brand-head-nav-arrowimg" :src="backarrow"></image>
            </div>
            <!--搜索-->
            <div class="search-box" @click="goSearch">
                <image :src="iconSearch" class="icon-search"></image>
                <text class="search-txt">搜索店铺内商品</text>
            </div>
        </div>        
        <div :class="[platform=='iOS' ? 'brand-head-shop2' : 'brand-head-shop']">
          <image v-if="item.logoImgUrl" :src="item.logoImgUrl" :class="[platform=='iOS' ? 'brand-head-shopimg2' : 'brand-head-shopimg']"  :placeholder="defalutBg"></image>
          <div class="brand-shop-info">
              <text class="brand-shop-info-text">{{item.flagshipName}}</text>
              <div class="brand-shop-flag">
                  <image v-if="item.logoImgUrl" class="brand-shop-selfflag" :src="selfimg"></image>
                  <!--<text class="brand-shop-watch">308人已关注</text>-->
              </div>
          </div>
          <div :class="['collect', isShopCollect== 'N' ? 'collect-red': '']" @click="toCollect" v-if="isShopCollect">
            <image :src="collectImg" class="collect-icon"  v-if="isShopCollect == 'N' "></image>
            <text class="collect-text">{{shopCollectVal}}</text>
            
          </div>
        </div>
        <!--更多按钮-->
        <image :src="require('../img/more.png')" :class="[platform=='iOS' ? 'btn-more2' : 'btn-more']" @click="onShowMenu"></image>
        <div :class="[platform=='iOS' ? 'g-popover2' : 'g-popover']" v-if="showMenu && buttons.length">
            <div class="u-popover-inner">
                <div @click="menuClick(item.text)" :class="['i-btn']" v-for="(item,i) in buttons" :key="i">
                    <image :src="item.icon" v-if="item.icon" class="btn-icon"></image>
                    <div :class="['i-btn-border',i === buttons.length-1 ? 'i-btn-noborder' : '']">
                        <text class="btn-text">{{item.text}}</text>
                    </div>                    
                </div>
            </div>
            <div class="u-popover-arrow"></div>
        </div>
    </div>
</template>
<style scoped>
.search-box {
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    width: 600px;
    height: 60px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #f6f6f6;
}
.icon-search {
    width: 50px;
    height: 50px;
}
.search-txt {
    color:#999999;
}
.brand-head{
    width:750px;
    height:216px;
}
.brand-head2 {
    width:750px;
    height:260px;
}
.brand-head-backimg{
    position:absolute;
    width:750px;
    height:216px;
}
.brand-head-backimg2{
    position:absolute;
    width:750px;
    height:260px;
}
.brand-head-backmask150 {
    position:absolute;
    width:750px;
    height:150px;
    /* opacity:0.4; */
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0));
}
.brand-head-backmask{
    position:absolute;
    width:750px;
    height:216px;
    /* background-color:#000000; */
    /* opacity:0.4; */
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4));
}
.brand-head-backmask2{
    position:absolute;
    width:750px;
    height:260px;
    /* background-color:#000000; */
    /* opacity:0.4; */
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4));
}
.brand-head-nav{
    width:750px;
    height:64px;
    margin-top:21px;
    flex-direction:row;
}
.brand-head-nav2{
    width:750px;
    height:64px;
    margin-top:80px;
    flex-direction:row;
}
.brand-head-nav-arrow{
  width:60px;
  height: 60px;
  margin-left:10px;
}
.brand-head-nav-arrowimg{
    width:60px;
    height:60px;
}
.brand-head-shop{
    margin-top:48px;
    flex-direction:row;
}
.brand-head-shop2 {
    margin-top:36px;
    flex-direction:row;
}
.brand-head-shopimg{
    width:150px;
    height:60px;
    background-color:#FFFFFF;
    border-radius:6px;
    margin-left:31px;
    align-items: flex-end;
}
.brand-head-shopimg2{
    width:150px;
    height:60px;
    background-color:#FFFFFF;
    border-radius:6px;
    margin-top: 5px;
    margin-left:31px;
    align-items: flex-end;
}
.brand-shop-info{
    margin-left:10px;
    align-items: flex-start;
}
.brand-shop-info-text{
    color:#FFFFFF;
    align-items: flex-start;
    font-size:28px;
    width:360px;
    lines:1;
    text-overflow:ellipsis;
}
.brand-shop-flag{
    flex-direction:row;
    align-items:center;
}
.brand-shop-selfflag{
    width:82px;
    height:24px;
}
.brand-shop-watch{
    color:#FFFFFF;
    font-size:20px;
    margin-left:15px;
}
/*更多按钮*/
.btn-more {
    position: absolute;
    top: 30px;
    right: 25px;
    width: 40px;
    height: 40px;
}
.btn-more2 {
    position: absolute;
    top: 90px;
    right: 25px;
    width: 40px;
    height: 40px;
}
.g-popover {
    position: fixed;
    padding-top: 13px;
    z-index: 10;
    right: 18px;
    top: 80px;
    opacity:0.96
}
.g-popover2 {
    position: fixed;
    padding-top: 13px;
    z-index: 10;
    right: 18px;
    top: 140px;
    opacity:0.96
}
.u-popover-arrow {
    position: absolute;
    border-radius: 4px;
    width: 30px;
    height: 30px;
    background-color: #ffffff;
    transform:scaleX(0.8) rotate(45deg);
    right: 10px;
    top: 0px;
    opacity:0.96;
    z-index: 9999;
}
.u-popover-inner {
    width: 370px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.2);
}
.i-btn {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height:90px;
}
.i-btn-border {
    width: 250px;
    border-bottom-width: 1px;
    border-bottom-color: #dcddde;
}
.i-btn-noborder {
    border-bottom-color: #ffffff;
    border-bottom-width: 0px;
}
.btn-icon {
    width: 56px;
    height: 56px;
    margin-left: 32px;
    margin-right: 32px;
}
.btn-text {
    flex: 1;
    height: 90px;
    font-size: 32px;
    line-height: 90px;
}

.collect{
    width: 120px;
    height: 52px;
    text-align: center;
    line-height: 52px;
    margin-left: 55px;
    border-width: 1px;
    border-style: solid;
    border-color: #ffffff;
    border-radius: 100px;
}

.collect-red{
    padding-left: 20px;
    font-size: 24px;
    background-color: #F30C59;
    border-width: 1px;
    border-style: solid;
    border-color: #F30C59;
}
.collect-text{
     height: 52px;
    line-height: 52px;
    /* margin-top: 8px; */
    align-items: flex-start;
    text-align: center;
    color:#FFFFFF;
    font-size: 24px;
    display: inline-block;
}
.collect-icon{
    width: 30px;
    height: 27px;
    position: absolute;
    top: 0px;
    left: 10px;
    margin-top: 12px;
}
</style>
<script>
const navigator = weex.requireModule('navigator')
const page = weex.requireModule('PageManagerModule')
import {http,isLive,getParams,isUat} from '../utils/index.js'
import { setTimeout } from 'timers';

const modal = weex.requireModule('modal')

export default {
    data () {
      return {
          selfimg:require('../img/selflogo.png'),
          backarrow:require('../img/brand-back.png'),
          defalutbgimg:require('../img/bg.png'),
          iconSearch:require('../../search/img/search.png'),
          showMenu: false,
          buttons: [{key: 1, icon: require('../img/share.png'), text: "分享"},
                    {key: 2, icon: require('../img/shop.png'), text: "首页"}, 
                    // {key: 3, icon: require('../img/selflogo.png'), text: "分类"},
                    {key: 4, icon: require('../img/my.png'), text: "我的"}],
          platform: weex.config.env.platform,
          collectImg: require('../img/collect.png'),
          HTTP : 'https',
          merchantIds : '',
          merchantType : 'QJ',
          isShopCollect: '',
          //   收藏Val
          shopCollectVal: '收藏',
      }
    },
    created () {
        if (isUat()) {
            this.HTTP = 'http'
        }
        // modal.toast({
        //     message: '最新',
        //     duration: 1
        // })

        if (weex.config.env.platform=='Web') {
            let queryData = {}
            try {
                location.search.replace('?','').split('&').forEach((item,index)=>{
                    let key = item.split('=')[0]
                    queryData[key]=item.split('=')[1]
                })
                if (queryData) {
                    this.merchantIds = queryData.shopKey
                }
            } catch (e) {
                console.log(e)
            } 
        } else {
            this.merchantIds = getParams(weex.config.bundleUrl,'shopKey')
        }
        if (weex.config.env.platform == 'Web') {
            if (window && window.navigator.userAgent.match(/gome\/|gomeplus\//)){
                let version = -1;
                // const matchResult = navigator.userAgent.match(/gomeplus\/[iphone\/]{0,7}(\d*)|gome\/[iphone\/]{0,7}(\d*)/)
                const matchResult = window.navigator.userAgent.match(/(gome(plus|backup)|GomeSeller)?\/[iphone\/]{0,7}(\d*)\//)
                version = matchResult ? matchResult[3] : -1
                if (version >=  140) {
                    this.collectInt()
                }
            } else {
                this.collectInt()
            }
        } else {
            this.collectInt()
        }
    },
    computed:{
        item(){
            return this.$store.state.shopInfo
        },
        pageInfo(){
            return this.$store.state.pageInfo
        },
        isInapp(){
            if(weex.config.env.platform=='Web'){
                if(window&&window.navigator.userAgent.match(/gome\/|gomeplus\//)){
                   return false
                }else{
                  return true
                }
            }else{
                return true
            }
        }
    },
    mounted(){
        if(weex.config.env.platform=='Web') {
            this.buttons = [{key: 2, icon: require('../img/shop.png'), text: "首页"}, {key: 4, icon: require('../img/my.png'), text: "我的"}]
            if (!!window && !window.navigator.userAgent.match(/gomeplus\//)) {
                setTimeout(()=>{
                    page.jump(page.getUrl().data.shareUrl.replace(/^[http|https]+/img, 'gomeplusapp'))
                }, 1500)
            }
        }
    },
    components:{
    },
    methods:{
        goback(){
            if(WXEnvironment.platform=='Web'){
               window.history.back()
            }else{
               navigator.pop({
                animated: "true"
                }, () => {
              })
            }
        },
        goSearch() {
            let url = weex.config.bundleUrl.replace('brand', 'search')

            navigator.push({
                url:url,
                animated: "true"
            }, () => {})
        },
        onShowMenu(e, isclose){
            this.showMenu = !!isclose ? false : !this.showMenu
        },
        menuClick(name){
            this.showMenu = false
            var _http = isUat()?'http':'https',
                _domain = isUat()?'atguat':'gome'
            if (name=='分享') {
                // 部分参数，接口获取
                var shareInfo = {
                    "shareImageUrl": this.pageInfo.shareImgUrl || "http://img.gomein.net.cn/mobile/images/share/logo.png",
                    // "shareUrl": (this.pageInfo.shareUrl.indexOf('http')==0 ? '' : (_http)) + this.pageInfo.shareUrl,
                    "shareUrl": page.getUrl().data.shareUrl,
                    "title": this.pageInfo.promoName,
                    "shareDesc": this.pageInfo.sharePromo,
                    "platform": [
                        "WeiBo",
                        "Wechat",
                        "WechatMoments",
                        "QQ",
                        "QZone",
                        "GomeMyFriends",
                        "GomeMoments",
                        "CopyLink"
                    ]
                }
                page.share(JSON.stringify(shareInfo))
            } else if (name=='首页') {
                page.jump(`${_http}://m.${_domain}.com.cn/index.html`)
            } else if (name=='分类') {
                page.jump(`${_http}://m.${_domain}.com.cn/goods_class.html`)
            } else if (name=='我的') {
                page.jump(`${_http}://u.m.${_domain}.com.cn/my_gome.html`)
            }
        },
        // 收藏点击
        toCollect () {
            const shopCollectionData = this.$store.state.shopCollectionData
            // let url = 'http://mobile.atguat.com.cn/h5/profile/mall/shopUserCollectionList.jsp'
            let url = `${this.HTTP}://mobile.${isUat()?'atguat':'gome'}.com.cn/h5/profile/mall/shopCollection.jsp`
            
            // let url = `${this.HTTP}://hd.m.${isUat()?'atguat':'gome'}.com.cn/interface/doCollectShopAjax`
            let dataOptions = {
                merchantIds: this.merchantIds,
                merchantType: this.merchantType
            }
            if (this.isShopCollect == 'Y') {
                dataOptions.isDelFlag = 'Y'
            }
            http({
            // php接口
                // url: `${this.HTTP}://m.${isUat()?'atguat':'gome'}.com.cn/shop/doCollectShopAjax?merchantIds=${this.merchantIds}&merchantType=${this.merchantType}&isDelFlag=Y`,
                // url: `${this.HTTP}://m.${isUat()?'atguat':'gome'}.com.cn/shop/doCollectShopAjax?merchantIds=${this.merchantIds}&merchantType=${this.merchantType}`,
                url,
                type: 'json',
                cors: 'Y',
                method: 'POST',
                data: dataOptions,
                isLoading:true,
            }).then(data => {
                const dataNew = data.data
                if (dataNew && dataNew.isSuccess == 'Y') {
                    if (this.isShopCollect == 'Y') {
                        modal.toast({
                            message: '已取消收藏',
                            duration: 1
                        })
                        this.shopCollectVal = '收藏'
                        this.isShopCollect ='N'
                    } else {
                        modal.toast({
                            message: '收藏成功',
                            duration: 1
                        })
                        this.shopCollectVal = '已收藏'
                        this.isShopCollect ='Y'
                    }
                } else {
                    if (dataNew.failReason && dataNew.failReason.match('请登录')) {
                        
                        let url = 'https://login.m.gome.com.cn/login.html'
                        // console.log('this.isInapp==='+this.isInapp)
                        if (isUat()) {
                            url = 'http://login.m.atguat.com.cn/login.html'
                        }
                        page.jump(url)
                    } else if (dataNew.failReason && dataNew.failReason.match('已收藏')) {
                        modal.toast({
                            message: dataNew.failReason || '收藏失败',
                            duration: 1
                        })
                        setTimeout(() => {
                            this.shopCollectVal = '已收藏'
                            this.isShopCollect ='Y'
                        }, 1500)
                    }
                    else {
                        modal.toast({
                            message: dataNew.failReason || '收藏失败',
                            duration: 1
                        })
                    }
                }                  
            }).catch((err)=>{
                console.log(err)
            })
        },
        // 初始化收藏
        collectInt () {
            http({
            // php接口
                url: `${this.HTTP}://mobile.${isUat()?'atguat':'gome'}.com.cn/wap/mall/shopDetail.jsp`,
                // url: 'http://mobile.atguat.com.cn/wap/mall/shopDetail.jsp',
                type: 'json',
                method:'POST',
                cors: 'Y',
                // body: weex.config.env.platform=='Web' ?
                //     `body:${JSON.stringify({merchantIds: this.merchantIds})}`:
                //     {merchantIds: this.merchantIds},
                data:  {merchantId: this.merchantIds},
            }).then(data=>{
                let dataNew = data.data
                if (dataNew && dataNew.isSuccess == 'Y') {
                    if (dataNew.favoriteId && dataNew.favoriteId != '') {
                        this.shopCollectVal = '已收藏'
                        this.isShopCollect = 'Y'
                    } else {
                        this.shopCollectVal = '收藏'
                        this.isShopCollect = 'N'
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
  }
</script>