/*
 * @Author: zhouJun 
 * @Date: 2018-03-21 14:56:01 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-04-27 10:32:11
 */
export default {
    getabc(state){
        return state.abc
    },
    goodsList(state){
        return state.demodata.templetList[0].goodsTemplet.goodsList
    }
}