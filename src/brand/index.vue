/*
 * @Author: zhouJun 
 * @Date: 2018-03-08 19:58:17 
 * @Last Modified by: yhw.yinhongwei
 * @Last Modified time: 2019-04-16 16:19:41
 */
<template>
   <div class="box" @click="defaultClick" @viewdisappear="(e) => { defaultClick(e); }">
    <head ref="weexhead"></head>
    <div class="top-nav">
      <div :class="['top-nav-item', currentNav == index ? 'hover1' : '']" v-for="(item, index) in topNavData" @click="touchSwitch(index)">
        <text :class="['nav-title', currentNav == index ? 'hover2' : '']">{{item.name}}</text>
      </div>
    </div>
    <div class="cont-wrap">    
        <div ref="contmove" class="cont-wrap-move">
           <scroller class="cont-div1" :style="scrollStyle">
               <home></home>
           </scroller>
            <list-goods :contHeight="contHeight" ref="listgoods1"></list-goods>
            <list-goods :contHeight="contHeight" ref="listgoods2"></list-goods>
            <list-goods :contHeight="contHeight" ref="listgoods3"></list-goods>
        </div>
    </div>
    <foot></foot>
    <div v-if="singleOrDouble" @click="switchList" class="switch-list">
      <image :src="switchListIcon" class="switch-list-img"></image>
    </div>
    <div class="goto-top" @click="gotoTop" v-if="gotoTopBtn&&singleOrDouble">
       <image :src="require('./img/return-top.png')" class="goto-top-img"></image>
    </div>
   </div>  
</template>
<style scoped>
.box{
    width:750px;
    background-color:#F2F2F2;
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
    border-bottom-color:#FFFFFF;
    border-bottom-width:2px;
}
.nav-title {
    color: #7A7F85;
    font-size: 28px;
}
.hover1 {
    border-bottom-color: #F20C59;
    border-bottom-width: 2px;
}
.hover2 {
    color: #F20C59;
}
.cont-wrap{
  width:750px;
}
.cont-wrap-move{
  width:3000px;
  flex-direction:row;
}
.cont-div1{
  width:750px;
  height:200px;
}
.cont-div2{
  width:750px;
  /*background-color:#CCCCCC;*/
}
.cont-div3{
  width:750px;
  /*background-color:#ABC3D2;*/
}
.cont-div4{
  width:750px;
 /* background-color:#303033;*/
}
.switch-list{
   border-radius: 50px;
   width: 92px;
   height: 92px;
   border-width: 1px;
   border-color: #CBCFD3;
   position: fixed;
   right: 15px;
   bottom: 250px;
   align-items: center;
   justify-content: center;
   background-color: rgba(255, 255, 255, 0.7);
}
.switch-list-img {
    width: 40px;
    height: 40px;
}
.goto-top {
  border-radius: 50px;
  width: 92px;
  height: 92px;
  border-width: 1px;
  border-color: #CBCFD3;
  position: fixed;
  right: 15px;
  bottom:150px;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
}
.goto-top-img {
   width: 92px;
   height: 92px;
 }
</style>
<script>
  import home from './home.vue'
  import head from './comps/head.vue'
  import foot from './comps/foot.vue'  
  import listGoods from './comps/listGoods.vue'
  const dom = weex.requireModule('dom')
  const animation = weex.requireModule('animation')
  // const modal = weex.requireModule('modal')
  export default {
    data () {
      return {
        objstyle:{
          height:0
        },
        scrollStyle:{
          height:0
        },
        contHeight:0,
        currentNav: 0,
        topNavData: [
          { name: '首页', type: '0'},
          { name: '全部', type: '1'},
          { name: '新品', type: '2'},
          { name: '热销', type: '3'}
        ],
        ListIsSingle:true,
        switchListIcon:require('./img/brand-double.png'),
        // gotoTopBtn: false, 
        
      }
    },
    created(){
        const { deviceHeight, deviceWidth,platform }  = weex.config.env;
        const Height=deviceHeight*750/deviceWidth
        // let pageHeight=387
        let pageHeight=296
        // 根据机型适配
        // if(platform=='Web'){
        //   pageHeight=387
        // }else if(platform=='android'){
        //   pageHeight=1000
        // }else{
        //   pageHeight=500
        // }
        // this.objstyle.height=deviceHeight-387+'px'
        // if(deviceHeight=='960'){
        //    this.scrollStyle.height='900px' 
        // }else{
        //    this.scrollStyle.height=deviceHeight-pageHeight+'px'
        // }
        // this.contHeight=deviceHeight-pageHeight+'px'
        // 根据屏幕尺寸适配
        this.scrollStyle.height=Height-pageHeight+'px'
        this.contHeight=Height-pageHeight+'px'


    },
    mounted(){
    },
    computed:{
      singleOrDouble(){
         return this.$store.state.tabIndex!=0
      },
      gotoTopBtn(){
         return this.$store.state.goTop
      }
    },
    components:{
      head,
      home,
      foot,
      listGoods,
    },
    methods:{
      touchSwitch (index) {
        this.currentNav = index;
        // 设置当前tab的索引值到store
        this.$store.commit('setTabIndex',index)
        // 请求tab为 全部-新品-热销的数据
        if(index==1){
         this.$refs.listgoods1.getData(1)
        }else if(index==2){
         this.$refs.listgoods2.getData(2)
        }else if(index==3){
         this.$refs.listgoods3.getData(3) 
        }
        // tab切换的动画效果
        const item= this.$refs.contmove
        let movex=index*750
        animation.transition(item,{
            styles:{
              transform:`translateX(-${movex}px)`,
            },
            duration:300,
            timingFunction:'ease',
            delay:0
          })
      },
      switchTabData (e) {
          if (e.direction=='right') {
              if (this.currentNav > 0) {
                  this.currentNav--;
              }
              this.touchSwitch(this.currentNav);
          } else if (e.direction=='left') {
              if (this.currentNav < 3) {
                  this.currentNav++;
              }
              this.touchSwitch(this.currentNav);
          }
      },
      switchList(){
        this.switchListIcon = this.ListIsSingle?require('./img/brand-single.png'): require('./img/brand-double.png')
        this.ListIsSingle = this.ListIsSingle?false:true
        this.$store.state.switchListIconFlag = this.ListIsSingle ? 2 : 1; 
        this.$store.state.refreshing=true
        setTimeout(()=>{
          this.$store.state.refreshing=false
        },500)
      },
      listScrollEvent (event) {    
          if (event.contentOffset.y<-100) {
              this.$store.state.goTop = true;
          } else {
              this.$store.state.goTop = false;
          }
      },
      gotoTop () {
        if(this.currentNav==1){
        this.$refs.listgoods1.gotoTop()
        }else if(this.currentNav==2){
        this.$refs.listgoods2.gotoTop()
        }else if(this.currentNav==3){
        this.$refs.listgoods3.gotoTop()        
        }
      },
      // 关闭浮层
      defaultClick(e){
        this.$refs.weexhead.onShowMenu(null, true)
      }
    }
  }
</script>
