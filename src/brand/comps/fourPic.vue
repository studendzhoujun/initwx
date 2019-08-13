/*
 * @Author: zhouJun 
 * @Date: 2018-03-15 14:53:19 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-09-11 18:14:57
 */
<template>
    <div class="fourPic">
      <div @click="go(bigimg)" :class="[ismargin?'mpicLeft':'picLeft']">
          <image :class="[ismargin?'mimgLeft':'imgLeft']" :src="bigimg.imageUrl" :placeholder="defalutBg"></image>   
      </div>    
      <div :class="[ismargin?'mpicRight':'picRight']">
        <div @click="go(topimg)" :class="[ismargin?'mpicRightTop':'picRightTop']">
           <image :class="[ismargin?'mimgRightTop':'imgRightTop']" :src="topimg.imageUrl" :placeholder="defalutBg"></image> 
        </div>
        <div :class="[ismargin?'mpicLeftBottom':'picLeftBottom']">
                <div @click="go(leftimg)" :class="[ismargin?'mpicRightBL':'picRightBL']">
                  <image :class="[ismargin?'mimgRightBL':'imgRightBL']" :src="leftimg.imageUrl" :placeholder="defalutBg"></image>
                </div> 
                <div @click="go(rightimg)" :class="[ismargin?'mpicRightBR':'picRightBR']">
                  <image :class="[ismargin?'mimgRightBR':'imgRightBR']" :src="rightimg.imageUrl" :placeholder="defalutBg"></image>
                </div> 
        </div>
      </div>     
  </div>
</template>
<style scoped>
.fourPic{
    width:750px;
    height:340px;
    margin-bottom:14px;
    flex-direction:row;
    justify-content:center;
    background-color:#ffffff;
}
.mpicLeft{
  width:360px;
  height:340px;
}
.mimgLeft{
  width:360px;
  height:340px;
}
.mpicRight{
  width:360px;
  height:340px;
  border-left-width:1px;
  border-left-style:solid;
  border-left-color:#EBECED;
}
.mpicRightTop{
  width:360px;
  height:130px;
  border-bottom-width:1px;
  border-bottom-style:solid;
  border-bottom-color:#EBECED;
}
.mimgRightTop{
  width:360px;
  height:128px;
}
.mpicLeftBottom{
  width:360px;
  height:210px;
  flex-direction:row;
}
.mpicRightBL{
  width:180px;
  height:210px;
}
.mimgRightBL{
  width:180px;
  height:210px;
}
.mpicRightBR{
  width:179px;
  height:210px;
  border-left-style:solid;
  border-left-width:1px;
  border-left-color:#EBECED;
}
.mimgRightBR{
  width:179px;
  height:210px;
}

/*no margin*/

.picLeft{
  width:375px;
  height:340px;
}
.imgLeft{
  width:375px;
  height:340px;
}
.picRight{
  width:374px;
  height:340px;
  border-left-width:1px;
  border-left-style:solid;
  border-left-color:#EBECED;
}
.picRightTop{
  width:374px;
  height:130px;
  border-bottom-width:1px;
  border-bottom-style:solid;
  border-bottom-color:#EBECED;
}
.imgRightTop{
  width:374px;
  height:128px;
}
.picLeftBottom{
  width:374px;
  height:210px;
  flex-direction:row;
}
.picRightBL{
  width:187px;
  height:210px;
}
.imgRightBL{
  width:187px;
  height:210px;
}
.picRightBR{
  width:187px;
  height:210px;
  border-left-style:solid;
  border-left-width:1px;
  border-left-color:#EBECED;
}
.imgRightBR{
  width:187px;
  height:210px;
}
</style>
<script>
export default {
    data () {
      return {
          // ismargin:true,
          lefturl:'https://gfs6.gomein.net.cn/T1IBJQBCZT1RCvBVdK.jpg',
          righturl:'https://gfs8.gomein.net.cn/T1IJYgBKWT1RCvBVdK.jpg',
          objstyle:{
              backgroundColor:'#d60f99'
          },
      }
    },
    created(){
    },
    props:['item'],
    computed:{
        topimg(){
          return this.item.imgList[0]
        },
        leftimg(){
            return this.item.smallImgList[0]
        },
        rightimg(){
            return this.item.smallImgList[1]
        },
        bigimg(){
            return this.item.bigImgList[0]
        },
        ismargin(){
            return this.item.templatePadding==1?true:false
        }
    },
    components:{
    },
    mounted(){
    },
    methods:{
      go(img){
        weex.requireModule('PageManagerModule').jump(img.scheme)
      }
    }
  }
</script>