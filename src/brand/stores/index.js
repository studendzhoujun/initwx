/*
 * @Author: zhouJun 
 * @Date: 2018-03-07 10:57:37 
 * @Last Modified by: yhw.yinhongwei
 * @Last Modified time: 2019-04-10 11:58:50
 */

import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
if(WXEnvironment.platform!=='Web'){
    Vue.use(Vuex)
} 
export default new Vuex.Store({
    state:{
        tabIndex:0,
        pageIndex:[1,1,1,1],
        isNodata:[false,false,false,false],
        isCollect:false,
        switchListIconFlag:2,
        refreshing: false,
        goTop:false,
        pageInfo:{},
        shopInfo:{},
        bottomList:null,        
        templetList:[
                
        ],
        serverTime:''
    },
    mutations,
    actions,
    getters
})