/*
 * @Author: zhouJun 
 * @Date: 2018-03-21 14:49:29 
 * @Last Modified by: yhw.yinhongwei
 * @Last Modified time: 2019-04-10 11:58:19
 */

export default {
    setTabIndex(state,value){
        state.tabIndex=value
    },
    initTem(state,data){
        state.templetList=data
    },
    initTime(state,data){
        state.serverTime=data
    },
    setCollect(state,value){
        state.isCollect=value
    },
    initPageInfo(state,value){
        state.pageInfo=value
    },
    initShopInfo(state,value){
        state.shopInfo=value
    },
    initBottomList(state,value){
        state.bottomList=value
    },
    addPageIndex(state,index){
        state.pageIndex[index]=state.pageIndex[index]+=1
    },
    isNoData(state,index){
        state.isNodata[index]=true
    }
}