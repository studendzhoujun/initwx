/*
 * @Author: zhouJun 
 * @Date: 2018-03-20 15:36:13 
 * @Last Modified by: yhw.yinhongwei
 * @Last Modified time: 2019-04-24 20:16:57
 */
<template>
  <div class="wrap" :style="{'height': contHeight}">
    <div v-if="refreshing" class="center">
        <image src="https://css.gomein.net.cn/plus/style/shop_search_list/images/loading.210c9c0ad5.gif" style="width:24px;height:24px"></image>
        <text class="indicator-text">&nbsp;&nbsp;正在加载中 ...</text>
    </div>
    <scroller v-if="!refreshing" ref="listWrap" :style="{'height':contHeight}">
      <div class="layout1" v-for="(item, idx) in moreCouponList" v-bind:key="idx" :ref="'floor'+idx">
        <div>
          <image :resize="contain" v-if="!!item[0]" :placeholder="placeholderImg" 
            :style="imgWH(item[0] && item[0].imageUrl || '', imgRowNum)" 
            :src="item[0] && item[0].imageUrl || ''" 
            :class="[couponState(item[0].fetchState) ? 'mask-img': '']"
            @click="onStartReceive(item[0].couponParam, 'tagCouponTemplet', idx, 0)"></image>
          <div v-if="!!item[0] && couponState(item[0].fetchState)" class="mask-layer" :style="imgWH(item[0] && item[0].imageUrl || '', imgRowNum)">
            <image :resize="contain" class="mask-content" :src="couponState(item[0].fetchState)" @click="couponStateUse(item[0])"></image>
          </div>
        </div>
        <div>
          <image :resize="contain" v-if="!!item[1]" :placeholder="placeholderImg" 
            :style="imgWH(item[1] && item[1].imageUrl || '', imgRowNum)" 
            :src="item[1] && item[1].imageUrl || ''" 
            :class="[couponState(item[1].fetchState) ? 'mask-img': '']"
            @click="onStartReceive(item[1].couponParam, 'tagCouponTemplet', idx, 1)"></image>
          <div v-if="!!item[1] && couponState(item[1].fetchState)" class="mask-layer" :style="imgWH(item[1] && item[1].imageUrl || '', imgRowNum)">
            <image :resize="contain" class="mask-content" :src="couponState(item[1].fetchState)" @click="couponStateUse(item[1])"></image>
          </div>
        </div>
        <div>
          <image :resize="contain" v-if="!!item[2]" :placeholder="placeholderImg" 
            :style="imgWH(item[2] && item[2].imageUrl || '', imgRowNum)" 
            :src="item[2] && item[2].imageUrl || ''" 
            :class="[couponState(item[2].fetchState) ? 'mask-img': '']"
            @click="onStartReceive(item[2].couponParam, 'tagCouponTemplet', idx, 2)"></image>
          <div v-if="!!item[2] && couponState(item[2].fetchState)" class="mask-layer" :style="imgWH(item[2] && item[2].imageUrl || '', imgRowNum)">
            <image :resize="contain" class="mask-content" :src="couponState(item[2].fetchState)" @click="couponStateUse(item[2])"></image>
          </div>
        </div>
      </div>
    </scroller>
    <coupon-captcha v-if="show" :codeUrl="codeUrl" :couponParam="couponParam" :tpl="tpl" :row="row" :column="column" />
  </div>
</template>
<style scoped>
  .wrap {
      width: 750px;
  }
  .layout1 {
    flex-direction: row;
    align-items: center;
    background-color: transparent;
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
  import {http,isLive,getParams,isUat} from '../utils/index.js'
  import couponCaptcha from './couponCaptcha.vue'
  
  export default {
    props: {
      imgRowNum: {
        type:Number,
        default: 2
      },
      contHeight:{
        type:Number,
        default:0
      }
    },
    data() {
      return {
        height: WXEnvironment.deviceHeight,
        loadinging: false,
        moreCouponList: [],
        
        show: false,
        codeUrl: '',
        couponParam: '',
        tpl: 'tagCouponTemplet',
        row: 0,
        column: 0
      }
    },
    created() {
    },
    computed:{
    },
    components:{
      couponCaptcha
    },
    filters:{
      imgUrl(value){
        return value==''?require('../img/defaut_bg.png'):value
      }
    },
    methods: {
      closeLayer() {
        this.show = false
      },
      // 获取tag优惠券
      getData(item, tid) {
        if (!!item && !item.moduleId) {
          this.moreCouponList = item
          return true
        }
        var _this = this
        var HTTP=isUat()?'http':'https'
        var shopKey=getParams(weex.config.bundleUrl,'shopKey')
        
        http({
          url:`${HTTP}://prom.mobile.${isUat()?'atguat':'gome'}.com.cn/wap/promotion/promscms/pagePromscms.jsp`,
          // type:isLive()?'json':'jsonp',
          type: weex.config.env.platform=='Web' ? 'jsonp' : 'json',
          // body: `body=${JSON.stringify({keyProms: shopKey, templetId: tid, moduleId: item.moduleId})}`,
          body: weex.config.env.platform=='Web' ?
            `body=${JSON.stringify({keyProms: shopKey, templetId: tid, moduleId: item.moduleId})}` : 
            {keyProms: shopKey, templetId: tid, moduleId: item.moduleId},
          // headers: weex.config.env.platform=='Web' ? {} : {'Content-Type':'application/json'},
          method:weex.config.env.platform=='Web' ? 'GET' : 'POST',
        }).then((data)=>{
          var data1=''
          // 接口返回数据类型在web和客户端不一样需处理
          if(typeof data.data =='string'){
            data1=JSON.parse(data.data)
          }else{
            data1=data.data
          }

        // var data1 = {"isActivated":"Y","isSessionExpired":"N","isSuccess":"Y","serverTime":"2019-04-10 17:21:02","tagCouponTemplet":{"tagCouponList":[{"couponList":[{"couponAmount":"30","couponComments":"优机库手机专营店","couponDesc":"特例品不可用","couponParam":"OUp5TXhnRE14RWpJNklDWkpWbWRwUjNZaEpDTGlVVE8yTVRNd0FET2lvaklrbEVjdmgyY2l3aUlIUmtXVUprSTZJQ1pKNTJid1YzYmpKQ0x6b2pJbEJYZVU1MmJ3VjNiakp5ZWNvdXBvblBhcmFt","couponType":3,"delayStartTime":0,"displayDate":"2019-04-01 00:00:02","endDate":"2019-05-31 00:00:00","fetchState":"4","imageUrl":"//gfs10.gomein.net.cn/wireless/T1J5bjBjhv1RCvBVdK_310_310.jpg","imageUrlList":["//gfs17.gomein.net.cn/T17xYjBXb_1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T1ehKvB_dT1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T1HUAbB_Vv1RCvBVdK_250.jpg"],"merchantId":"80013695","promoCaseId":"110813_BTZDG","saleDesc":"满2000可用","startDate":"2019-04-01 00:00:00","takeUpEndDate":"2019-04-30 23:59:55","takeUpStartDate":"2019-04-01 00:00:02","usedDesc":"0.012"},{"couponAmount":"30","couponComments":"新魅之蓝手机专营店","couponDesc":"特例品不可用","couponParam":"OUpDTnhnRE14RWpJNklDWkpWbWRwUjNZaEpDTGlZRE4yVVRNd0FET2lvaklrbEVjdmgyY2l3aUlZRmtXS0prSTZJQ1pKNTJid1YzYmpKQ0x6b2pJbEJYZVU1MmJ3VjNiakp5ZWNvdXBvblBhcmFt","couponType":3,"delayStartTime":0,"displayDate":"2019-04-01 00:00:02","endDate":"2019-05-31 00:00:00","fetchState":"4","imageUrl":"//gfs11.gomein.net.cn/wireless/T1sPWQBbAv1RCvBVdK_310_310.jpg","imageUrlList":["//gfs17.gomein.net.cn/T152KbB7Z_1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T1BPYjBsZT1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T1D3A_BgKT1RCvBVdK_250.jpg"],"merchantId":"80015646","promoCaseId":"110814_BJZAX","saleDesc":"满4000可用","startDate":"2019-04-01 00:00:00","takeUpEndDate":"2019-04-30 23:59:55","takeUpStartDate":"2019-04-01 00:00:02","usedDesc":"0.001"},{"couponAmount":"130","couponComments":"嘉和电脑专营店","couponDesc":"特例品不可用","couponParam":"OUpDTXlVRE14RWpJNklDWkpWbWRwUjNZaEpDTGlrVE0yVURNd0FET2lvaklrbEVjdmgyY2l3aUlPOTBSV0prSTZJQ1pKNTJid1YzYmpKQ0x6b2pJbEJYZVU1MmJ3VjNiakp5ZWNvdXBvblBhcmFt","couponType":3,"delayStartTime":0,"displayDate":"2019-03-29 00:00:10","endDate":"2019-06-18 15:00:00","fetchState":"1","imageUrl":"//gfs13.gomein.net.cn/wireless/T1ThAgBKZv1RCvBVdK_310_310.jpg","imageUrlList":["//gfs17.gomein.net.cn/T1pChQB5dj1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T1n5hgB5Kv1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T1ZuxjBKbT1RCvBVdK_250.jpg"],"merchantId":"80005619","promoCaseId":"110520_BVGON","saleDesc":"满2000可用","startDate":"2019-03-20 15:00:00","takeUpEndDate":"2019-06-18 14:59:55","takeUpStartDate":"2019-03-29 00:00:10","usedDesc":"0.006"},{"couponAmount":"30","couponComments":"北京联拓电脑专营店","couponDesc":"特例品不可用","couponParam":"OUpTTXlZRE14RWpJNklDWkpWbWRwUjNZaEpDTGlNak0xWVRNd0FET2lvaklrbEVjdmgyY2l3aUlYWkVSQkprSTZJQ1pKNTJid1YzYmpKQ0x6b2pJbEJYZVU1MmJ3VjNiakp5ZWNvdXBvblBhcmFt","couponType":3,"delayStartTime":0,"displayDate":"2019-03-27 00:00:10","endDate":"2019-06-23 11:00:00","fetchState":"1","imageUrl":"//gfs11.gomein.net.cn/wireless/T1ckLQBbEv1RCvBVdK_310_310.jpg","imageUrlList":["//gfs17.gomein.net.cn/T1qPYjBXd_1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T1HAxvB5Dy1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T1R9EvB5YQ1RCvBVdK_250.jpg"],"merchantId":"80016523","promoCaseId":"110621_BADFW","saleDesc":"满2000可用","startDate":"2019-03-25 11:00:00","takeUpEndDate":"2019-06-23 10:59:55","takeUpStartDate":"2019-03-27 00:00:10","usedDesc":"0.001"},{"couponAmount":"50","couponComments":"拾宝商城电脑专营店","couponDesc":"特例品不可用","couponParam":"OUpDTXhZRE14RWpJNklDWkpWbWRwUjNZaEpDTGlFVE4wQVRNd0FET2lvaklrbEVjdmgyY2l3aUlhVmxXSEprSTZJQ1pKNTJid1YzYmpKQ0x6b2pJbEJYZVU1MmJ3VjNiakp5ZWNvdXBvblBhcmFt","couponType":3,"delayStartTime":0,"displayDate":"2019-03-27 00:00:10","endDate":"2019-04-30 10:00:00","fetchState":"1","imageUrl":"//gfs10.gomein.net.cn/wireless/T14oLgB4Ev1RCvBVdK_310_310.jpg","imageUrlList":["//gfs17.gomein.net.cn/T1e8WjBQEv1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T1OsJbB_CT1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T1YGd_BQET1RCvBVdK_250.jpg"],"merchantId":"80010451","promoCaseId":"110610_BGZUZ","saleDesc":"满1999可用","startDate":"2019-03-25 10:00:00","takeUpEndDate":"2019-04-30 09:59:55","takeUpStartDate":"2019-03-27 00:00:10","usedDesc":"0.002"},{"couponAmount":"50","couponComments":"嘉合永兴电脑专营店","couponDesc":"特例品不可用","couponParam":"OUppTXhZRE14RWpJNklDWkpWbWRwUjNZaEpDTGlnVE0yVURNd0FET2lvaklrbEVjdmgyY2l3aUlOeEVSWUprSTZJQ1pKNTJid1YzYmpKQ0x6b2pJbEJYZVU1MmJ3VjNiakp5ZWNvdXBvblBhcmFt","couponType":3,"delayStartTime":0,"displayDate":"2019-03-27 00:00:10","endDate":"2019-04-30 23:00:00","fetchState":"1","imageUrl":"//gfs10.gomein.net.cn/wireless/T1YFYgB7Z_1RCvBVdK_310_310.jpg","imageUrlList":["//gfs17.gomein.net.cn/T1FcCgBTZT1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T1J8_bBs_T1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T1WcbbB__v1RCvBVdK_250.jpg"],"merchantId":"80005618","promoCaseId":"110612_BXDLM","saleDesc":"满1999可用","startDate":"2019-03-25 10:00:00","takeUpEndDate":"2019-04-30 22:59:55","takeUpStartDate":"2019-03-27 00:00:10","usedDesc":"0.007"},{"couponAmount":"100","couponComments":"嘉合永兴电脑专营店","couponDesc":"特例品不可用","couponParam":"OUp5TXhZRE14RWpJNklDWkpWbWRwUjNZaEpDTGlnVE0yVURNd0FET2lvaklrbEVjdmgyY2l3aUlFOUVSUUprSTZJQ1pKNTJid1YzYmpKQ0x6b2pJbEJYZVU1MmJ3VjNiakp5ZWNvdXBvblBhcmFt","couponType":3,"delayStartTime":0,"displayDate":"2019-03-27 00:00:10","endDate":"2019-04-30 23:00:00","fetchState":"1","imageUrl":"//gfs13.gomein.net.cn/wireless/T10ZLQBmA_1RCvBVdK_310_310.jpg","imageUrlList":["//gfs17.gomein.net.cn/T1FcCgBTZT1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T1J8_bBs_T1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T1WcbbB__v1RCvBVdK_250.jpg"],"merchantId":"80005618","promoCaseId":"110613_BPDOD","saleDesc":"满4999可用","startDate":"2019-03-25 10:00:00","takeUpEndDate":"2019-04-30 22:59:55","takeUpStartDate":"2019-03-27 00:00:10","usedDesc":"0.008"},{"couponAmount":"40","couponComments":"宏泰速达电脑专营店","couponDesc":"特例品不可用","couponParam":"OUpDTnlZRE14RWpJNklDWkpWbWRwUjNZaEpDTGlBek55a0RNd0FET2lvaklrbEVjdmgyY2l3aUlXeGtRWEprSTZJQ1pKNTJid1YzYmpKQ0x6b2pJbEJYZVU1MmJ3VjNiakp5ZWNvdXBvblBhcmFt","couponType":3,"delayStartTime":0,"displayDate":"2019-04-01 11:00:10","endDate":"2019-04-30 23:00:00","fetchState":"1","imageUrl":"//gfs11.gomein.net.cn/wireless/T1UtbjB4Cg1RCvBVdK_310_310.jpg","imageUrlList":["//gfs17.gomein.net.cn/T1DLEQBmLT1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T1h.KbBgAT1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T15yLjBTx_1RCvBVdK_250.jpg"],"merchantId":"80009270","promoCaseId":"110624_BWBLV","saleDesc":"满3999可用","startDate":"2019-04-01 11:00:00","takeUpEndDate":"2019-04-30 22:59:55","takeUpStartDate":"2019-04-01 11:00:10","usedDesc":"0.004"},{"couponAmount":"60","couponComments":"宏泰速达电脑专营店","couponDesc":"特例品不可用","couponParam":"OUpTTnlZRE14RWpJNklDWkpWbWRwUjNZaEpDTGlBek55a0RNd0FET2lvaklrbEVjdmgyY2l3aUlSMVVUREprSTZJQ1pKNTJid1YzYmpKQ0x6b2pJbEJYZVU1MmJ3VjNiakp5ZWNvdXBvblBhcmFt","couponType":3,"delayStartTime":0,"displayDate":"2019-04-01 11:00:10","endDate":"2019-04-30 23:00:00","fetchState":"1","imageUrl":"//gfs10.gomein.net.cn/wireless/T1WeKvBv_b1RCvBVdK_310_310.jpg","imageUrlList":["//gfs17.gomein.net.cn/T1DLEQBmLT1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T1h.KbBgAT1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T15yLjBTx_1RCvBVdK_250.jpg"],"merchantId":"80009270","promoCaseId":"110625_BCMMQ","saleDesc":"满4999可用","startDate":"2019-04-01 11:00:00","takeUpEndDate":"2019-04-30 22:59:55","takeUpStartDate":"2019-04-01 11:00:10","usedDesc":"0.004"},{"couponAmount":"100","couponComments":"永兴电脑专营店","couponDesc":"特例品不可用","couponParam":"OUpTTjNZRE14RWpJNklDWkpWbWRwUjNZaEpDTGlFRE4wWURNd0FET2lvaklrbEVjdmgyY2l3aUlGNVVUT0prSTZJQ1pKNTJid1YzYmpKQ0x6b2pJbEJYZVU1MmJ3VjNiakp5ZWNvdXBvblBhcmFt","couponType":3,"delayStartTime":0,"displayDate":"2019-03-27 11:00:10","endDate":"2019-04-30 11:00:00","fetchState":"1","imageUrl":"//gfs12.gomein.net.cn/wireless/T1ZOJgBvx_1RCvBVdK_310_310.jpg","imageUrlList":["//gfs17.gomein.net.cn/T1t6EsBQKv1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T1KALQBm_v1RCvBVdK_250.jpg","//gfs17.gomein.net.cn/T1bPVgBbZv1RCvBVdK_250.jpg"],"merchantId":"80006441","promoCaseId":"110675_BNMNE","saleDesc":"满2000可用","startDate":"2019-03-26 11:00:00","takeUpEndDate":"2019-04-30 10:59:55","takeUpStartDate":"2019-03-27 11:00:10","usedDesc":"0.111"}],"moduleId":"7131712","tagName":"潮流3C"}],"templateUseFlag":"N"}}
          
          if (data1.isSuccess=='Y') {
            var list = data1.tagCouponTemplet && data1.tagCouponTemplet.tagCouponList && data1.tagCouponTemplet.tagCouponList[0].couponList || []
            
            if (list.length > 0) {
              var temp = [] // 指定列的数据集
              if (_this.imgRowNum=3) {
                for(var i=0;i<list.length;i+=3) {
                  temp.push([list[i] || '', list[i+1] || '', list[i+2] || ''])
                }
              } else if (_this.imgRowNum==2) {
                for(var i=0;i<list.length;i+=3) {
                  temp.push([list[i] || '', list[i+1] || ''])
                }
              } else {
                temp = list
              }

              // 处理，默认标签为空，高度为0
              if (temp.length > 0 && _this.contHeight=="0px") {
                var hi = _this.imgWH(list[0].imageUrl, _this.imgRowNum)
                _this.contHeight = hi.height
              }
              
              _this.moreCouponList = temp
            }
          } else {
            modal.toast({
              message: data1.failReason
            })
          }
        }).catch((err)=>{
          modal.toast({
            message: JSON.stringify(err)
          })
        })
      },
    }
  }
</script>