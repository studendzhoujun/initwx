/*
 * @Author: zhouJun 
 * @Date: 2018-03-21 14:53:04 
 * @Last Modified by: yhw.yinhongwei
 * @Last Modified time: 2019-04-26 17:54:56
 */
import {http,isLive,getParams,isUat} from '../utils/index.js'
export default {
    // 首页数据获取
    initData({state,commit,dispatch}){
       http({
            url:'http://10.2.120.177:8080/api/init',
            // isLoading:true,
       }).then(data=>{ 
        let flagship = data.data.templetList.filter((item,index)=>{
            return item.templetCode=='flagshipTemplet'
        })
        let bottom = data.data.templetList.filter((item,index)=>{
            return item.templetCode=='commonBottomColumnTemplet'
        })
        // 分享信息
        if (!!data.data.pageInfo) {
            commit('initPageInfo', data.data.pageInfo)
        }
        if(flagship.length){
            commit('initShopInfo',flagship[0].flagShipTemplet)
        }
        if(bottom.length){
           commit('initBottomList',bottom[0].commonBottomColumnTemplet)
        }

        let templetList=data.data.templetList.map((item,index)=>{
            return {'templetCode':item.templetCode,'data':item[item.templetCode],'originData':item}
        })
        console.log(templetList)
        commit('initTem',templetList)
           
       }).catch((err)=>{
           console.log(err)
       })
    },
    getCollect({state,commit,dispatch},flag){
        http({
            url:`/api/collect?flag=${flag}`,
        }).then(data=>{
            console.log(data)
            commit('setCollect',data.data.flag)
        }).catch(err=>{
            console.log(err)
        })
    },
    initIndex({state,commit,dispatch}){
        console.log('islive',isLive())
        console.log('shopKey',getParams(weex.config.bundleUrl,'shopKey'))
        // channel7uVJUciJZPh
        // DLsxwSEKXwj
        let shopKey=getParams(weex.config.bundleUrl,'shopKey')
        let HTTP=isUat()?'http':'https'
        http({
         url:`${HTTP}://prom.mobile.${isUat()?'atguat':'gome'}.com.cn/wap/promotion/promscms/${shopKey}.jsp`,
        //  type:weex.config.env.platform=='Web'?'jsonp':'json',
        //  body: {isWeex: '1'},
         method:'POST',
        }).then((data)=>{
            let data1=''
            // 接口返回数据类型在web和客户端不一样需处理
            if(typeof data.data =='string'){
                data1=JSON.parse(data.data)
            }else{
                data1=data.data
            }
            
            let flagship=data1.templetList.filter((item,index)=>{
                return item.templetCode=='flagshipTemplet'
            })
            let bottom = data1.templetList.filter((item,index)=>{
                return item.templetCode=='commonBottomColumnTemplet'
            })
            if(flagship.length){
                commit('initShopInfo',flagship[0].flagShipTemplet)
            }
            if(bottom.length){
                commit('initBottomList',bottom[0].commonBottomColumnTemplet)
            }
            let othertemp=data1.templetList.filter((item,index)=>{
                if(item.templetCode=='flagshipTemplet'||item.templetCode=='commonBottomColumnTemplet'){
                    return false
                }else{
                    return true
                }
            })
            let templetList=othertemp.map((item,index)=>{
                return {'templetCode':item.templetCode,'data':item[item.templetCode],'originData':item}
            })
            //   console.log(templetList)
              commit('initTem',templetList)
              commit('initTime',data1.serverTime)
              commit('initPageInfo',data1.pageInfo)
              if(weex.config.env.platform=='Web'){
                try{
                    document.title=data1.pageInfo.promoName
                }catch(err){
                    
                }
              }
        }).catch((err)=>{
            weex.requireModule('modal').toast({
                message:JSON.stringify(err),
                duration:2
            })
        })
    },
    updateCoupon(couponParam) {
        
    }
}