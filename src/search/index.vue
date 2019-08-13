/*
 * @Author: yinhongwei 
 * @Date: 2019-04-02 11:34:27 
 * @Last Modified by: yinhongwei
 * @Last Modified time: 2019-05-30 14:09:12
 */
<template>
    <div class="page" @viewappear="onrefresh" :style="{paddingTop: mobile.indexOf('iPhone11,')>=0 ? '178px': '138px'}">
        <div :class="['nav-head', 'flexrow', mobile.indexOf('iPhone11,')>=0 ? 'nav-ipx': 'nav']">
            <image @click="goback" class="nav-arrow" :src="back"></image>
            <div class="input-wrap">
                <input ref="searchbox" class="input" type="text" placeholder="搜索店铺内商品" placeholder-color="#5A6066" :value="searchKey" @input="oninput" @change="oninput" @return="onSearch" /><!-- @focus="oninput" @blur="oninput"-->
            </div>
            <image v-if="!!searchKey" @click="onClearKey" class="nav-clear" :src="clear"></image>
            <text class="nav-t" @click="onSearch">搜索</text>
        </div>
        <!--history-->
        <div class="history" v-if="searchKey=='' || !searchFlag">
            <text class="history-1">搜索历史</text>
            <div class="flexrow flexwrap">
                <text class="history-2" @click="onSearch(null, item)" v-for="(item,idx) in historyData" :key="idx">{{item}}</text>
            </div>
            <div class="history-3">
                <div @click="onClearSearch"  class="history-btn">
                    <text class="history-txt">清空搜索历史</text>
                </div>
            </div>
        </div>
        <scroller v-if="searchFlag" class="scroller" scroll-direction="horizontal" show-scrollbar="false">
            <div class="flexrow">
                <div :class="['tag-row', 'flexrow', idx==currentTag ? 'tag-hover' : '']" @click="onrefresh(null, idx)" v-for="(item, idx) in navData" :key="idx">
                    <text :class="['tag-txt', idx==currentTag ? 'tag-hover-txt' : '']">{{item}}</text>
                    <image v-if="item=='价格'" class="tag-sort" :src="iconSort"></image>
                </div>
            </div>
        </scroller>
        <!---->
        <div v-if="searchKey!='' && searchFlag && !refreshing && listData.length==0" class="center" :style="{height: pageH,flexDirection: isNoData ? 'column' : 'row'}">
            <image v-if="!isNoData" src="https://css.gomein.net.cn/plus/style/shop_search_list/images/loading.210c9c0ad5.gif" style="width:24px;height:24px"></image>
            <image v-else :src="noDataImg" style="width:300px;height:300px;margin-bottom: 30px;"></image>
            <text class="indicator-text">&nbsp;&nbsp;{{isNoData ? '您还没有相关订单' : '正在加载中...'}}</text>
        </div>
        <list v-if="searchKey!='' && searchFlag" class="bg" @loadmore="onloading" loadmoreoffset="100"><!-- @scroll="onScroll" offset-accuracy="100" show-scrollbar="false"-->
            <refresh class="loading" @refresh="onrefresh" @pullingdown="onpullingdown" :display="searchFlag && refreshing ? 'show' : 'hide'">
                <loading-indicator class="indicator"></loading-indicator>
                <text class="indicator-text">{{pullText}}</text>
            </refresh>
            <cell class="list-item" v-for="(item, idx) in listData" :key="idx">
                <div class="flexrow" @click="onDetail(item)">
                    <image class="good-img" :src="'//gfs17.gomein.net.cn/T1vzCjBChv1RCvBVdK_250.jpg' || item.imgUrl || defaultImg" :placeholder="defaultImg"></image>
                    <div>
                        <div class="line">
                            <text class="good-t">海尔（Haier） XQB80-M1708 8公斤波轮洗衣机 钢化玻璃上盖 大屏LED显示 筒自洁 月光灰</text>
                        </div>
                        <text class="good-m">&yen; 4499.00</text>
                        <text class="good-p">790人评价</text>
                    </div>
                </div>
            </cell>
            <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'" v-if="loadinging">
                <loading-indicator class="indicator"></loading-indicator>
                <text class="indicator-text">加载中 ...</text>
            </loading>
        </list>
    </div>  
</template>
<style scoped>
.scroller {
    width: 750px;
    height: 80px;
}
.tag-row {
    width:150px;
    height: 72px;
    align-items: center;
    justify-content: center;
    border-bottom-color: #d2d2d2;
    border-bottom-width: 1px;
}
.tag-txt {
    font-size: 30px;
}
.tag-hover-txt {
    color:#F20C59;
}
.tag-hover {
    border-bottom-color: #F20C59;
    border-bottom-width: 4px;
}
.tag-sort {
    width: 12px;
    height: 18px;
    margin-left: 5px;
}
/*列表样式*/
.list-item {
    border-bottom-style: solid;
    border-bottom-color: #F3F5F7;
    border-bottom-width: 1px;
    padding-top: 15px;
    padding-right: 15px;
    padding-left: 15px;
    padding-bottom: 15px;
}
.good-img {
    width: 250px;
    height: 250px;
    margin-right: 30px;
}
.good-t {
    font-size: 30px;
    lines:2;
}
.good-m {
    font-size: 30px;
    color: #F20C59;
    margin-top: 50px;
    margin-bottom: 50px;
}
.good-p {
    font-size: 22px;
    color: #7A7F85;
}
.line {
    width: 440px;
}
.page, .bg{
    width:750px;
    /* background-color:#f3f5f7; */
}
/*顶部搜索*/
.nav-head{
    width:750px;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: #ffffff;
    justify-content: space-between;
    align-items:center;
    border-bottom-width: 1px;
    border-bottom-color: #EBECED;
}
.nav {
    height:138px;
    padding-top:50px;
}
.nav-ipx {
    height:168px;
    padding-top:80px;
}
.nav-arrow{
    width:26px;
    height:46px;
    margin-left:35px;
    margin-right: 20px;
}
.nav-clear {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 130px;
    bottom: 28px;
    background-color: #aba5a5;
    border-radius: 24px;
}
.nav-t {
    font-size: 32px;
    color: #262C32;
    margin-right: 18px;
    margin-left: 20px;
}
.input-wrap {
    width: 568px;
    height: 60px;
    background-color: #EBECED;
    border-radius: 100px;
    padding-top: 10px;
    padding-right: 24px;
    padding-bottom: 10px;
    padding-left: 24px;
}
.input {
    font-size: 28px;
    color: #5A6066;
    height: 40px;
    background-color: #EBECED;
    outline: none;
}
/*搜索历史*/
.history {
    padding-top: 30px;
    padding-right: 25px;
    padding-bottom: 30px;
    background-color: #ffffff;
}
.history-1 {
    font-size: 28px;
    color: #7A7F85;
    margin-bottom: 27px;
    margin-left: 25px;
}
.history-2 {
    background-color: #F3F5F7;
    border-radius: 28px;
    font-size: 28px;
    color: #5A6066;
    justify-content: center;
    align-items: center;
    margin-left: 25px;
    margin-bottom: 20px;
    padding-top: 9px;
    padding-right:26px;
    padding-bottom: 9px;
    padding-left: 26px;
}
.history-3 {
    flex-direction: row;
    justify-content: center;
}
.history-btn {
    background-color: #FFFFFF;
    border-width: 1px;
    border-color: #DCDDDE;
    border-style: solid;
    border-radius: 35px;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    width:380px;
    height: 70px;
}
.history-txt {
    font-size: 28px;
    color: #5A6066;
}
/*下拉刷新*/
.tag-loading, .center {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 750px;
    background-color: #ffffff;
}
.tag-loading {
    height: 100px;
}
.center {
    height: 600px;
    padding-top: 500px;
    padding-bottom: 900px;
}
.loading {
    width: 750px;
    height: 100px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #e8e5e5;
}
.indicator-text {
    color: #000000;
    font-size: 30px;
    text-align: center;
}
.indicator {
    height: 30px;
    width: 30px;
    color: #000000;
    margin-right: 10px;
}
.flexrow{
    flex-direction: row;
}
.flexwrap {
    flex-wrap: wrap;
}
</style>
<script>
  const modal = weex.requireModule('modal')
  const dom = weex.requireModule('dom')
  const animation = weex.requireModule('animation')
  const navigator = weex.requireModule('navigator')
  const storage = weex.requireModule('storage')
  import {http,isLive,getParams,isUat} from '../brand/utils/index.js'
import { setTimeout } from 'timers';
  export default {
    data () {
      return {
            back:require('./img/back.png'),
            search:require('./img/search.png'),
            clear:require('./img/clear.png'),
            iconSort:require('./img/sort.png'),
            defaultImg:require('./img/defaut_bg.png'),
            noDataImg: require('./img/no_data.png'),
            pageH: '750px',
            
            navData: ['综合', '销量', '新品', '价格', '评价'],
            currentTag: 0,
            isSort: 0,
            
            historyData: [],
            searchFlag: false,
            searchKey: '',
            limit: 45,

            pullText:'下拉刷新',
            refreshing: false,
            loadinging: false,

            currentPage: 1,
            totalPage: 1,
            listData: [],
            isNoData: false,

            mobile: weex.config.env.deviceModel || ''
      }
    },
    created(){
        storage.getItem('brandSearchKeys', event => {
            var keys = event.data=='undefined' ? '[]' : event.data
            this.historyData = JSON.parse(keys)
        })
    },
    mounted(){
    },
    computed:{
    },
    components:{
    },
    methods:{
        // 关键字
        oninput(e) {
			this.searchKey = e.value

			if (this.searchKey.length > this.limit) {
				this.searchKey = this.searchKey.substring(0, this.limit)
				e.value = this.searchKey
			}

            if (!this.searchKey) {
                this.searchFlag = false
            }
		},
        // 搜索词
        onSearch(e, param) {
            if (!!param) {
                this.searchKey = param;
            }
            setTimeout(()=>{
                if (!this.searchKey) {
                    modal.toast({
                        message: '请输入会员卡号/会员手机号',
                        duration: 2
                    })
                } else {
                    if (!param && !!this.searchKey) {
                        storage.getItem('brandSearchKeys', event => {
                            var keys = event.data=='undefined' ? '[]' : event.data

                            if (keys.indexOf('"' + this.searchKey + '"') < 0) {
                                var keysA = JSON.parse(keys)
                                keysA.push(this.searchKey)
                                this.historyData = keysA
                                storage.setItem('brandSearchKeys', JSON.stringify(keysA))
                            }
                        })
                    }

                    this.searchFlag = true
                    this.$refs.searchbox.blur()
                    this.onrefresh()
                }
            }, 100)
        },
        onClearKey() {
            this.searchKey = ''
            this.currentPage = 1
            this.totalPage = 1
            this.listData = []
        },
        // 清除搜索记录
        onClearSearch() {
            this.searchFlag = false
            storage.removeItem('brandSearchKeys')
            this.historyData = []
        },
        // 下拉刷新
        onpullingdown (event) {
            if(event.pullingDistance>100){
                this.pullText='松开刷新'
            }else{
                this.pullText='下拉刷新'
            }
        },
        // 下拉刷新
        onrefresh (event, idx) {
            this.currentPage = 1
            if (!!event) {
                this.refreshing = true
            }
            if (idx != null) {
                this.currentTag = idx
                if (idx==3) {
                    this.iconSort = this.isSort == 0 ? require('./img/sort-up.png') : require('./img/sort-down.png')
                    this.isSort = this.isSort == 0 ? 1 : 0
                }
            }
            this.listData = []
            this.fetchData()
        },
        // 获取接口数据
        fetchData () {
            var _this = this
            if (_this.totalPage < _this.currentPage) {
                _this.loadinging = false
                modal.toast({
                    message: '没有更多了'
                })
                return
            }

            _this.isNoData = false

            // test=====================================================
            setTimeout(()=>{
                if (_this.refreshing) {
                    _this.listData = [1,2,3,4,5,6]
                } else {
                    _this.listData = _this.listData.concat([1,2,3,4,5,6])
                }

                _this.refreshing = false
                _this.loadinging = false
                
                _this.totalPage = 1
                _this.currentPage += 1
            }, 3000)
            // end test=====================================================

            /*let HTTP=isUat()?'http':'https'
            let myData = {
                searchNum: _this.searchKey, 
                orderStatus: '0', 
                queryType: '2', 
                pageSize: 10, 
                currentPage: _this.currentPage
            }
            http({
                url:`/staffh5/order/forward/subscriptionOrderList`,
                data: myData,
                method: 'POST',
            }).then(data=>{
                var data1=''
                // 接口返回数据类型在web和客户端不一样需处理
                if(typeof data.data =='string'){
                    data1=JSON.parse(data.data)
                }else{
                    data1=data.data
                }

                if (data1.status=='200' && !!data1.dataInfo) {
                    if (_this.refreshing) {
                        _this.listData = data1.dataInfo.subscriptionOrderList
                    } else {
                        _this.listData = _this.listData.concat(data1.dataInfo.subscriptionOrderList)
                    }

                    _this.refreshing = false
                    _this.loadinging = false
                    
                    _this.totalPage = data1.dataInfo.pageInfo.totalPage
                    _this.currentPage = data1.dataInfo.pageInfo.currentPage + 1
                } else {
                    if (_this.currentPage==1) {
                        _this.listData = []
                        _this.isNoData = true
                    }
                    modal.toast({
                        message: data1.msg || '暂无数据'
                    })
                }
            }).catch((err)=>{
                var msg = JSON.stringify(err)
                if (err.status=='404') {
                    msg = '网络异常'
                }
                modal.toast({
                    message: msg,
                    duration: 3
                })
            })*/
        },
        // 加载更多
        onloading (event) {
            this.loadinging = true
            this.fetchData();
        },
        onDetail(item) {
            let url = weex.config.bundleUrl.replace('orderSearch', 'details')//.replace('dy_Ymid9j0q50B', 'dy_7hDAaD8DLHC')
            url += (url.indexOf('?')>0 ? '&': '?') + "orderId=" + item.orderId
            
            navigator.push({
                url:url,
                animated: "true"
            }, () => {})
        },
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
    }
  }
</script>
