/*
 * @Author: zhouJun 
 * @Date: 2018-03-15 13:53:38 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-09-11 18:14:01
 */
<template>
    <div class="threePicRow">
        <div :class="[ismargin?'mpicLeft':'picLeft']">
              <div @click="go(leftimg)" :class="[ismargin?'mpicLeftTop':'picLeftTop']">
                <image :class="[ismargin?'mimglt':'imglt']" :src="leftimg.imageUrl" :placeholder="defalutBg"></image> 
              </div>
              <div @click="go(rightimg)" :class="[ismargin?'mpicLeftBottom':'picLeftBottom']">
                <image :class="[ismargin?'mimglb':'imglb']" :src="rightimg.imageUrl" :placeholder="defalutBg"></image> 
              </div>
        </div>
        <div @click="go(bigimg)" :class="[ismargin?'mpicRight':'picRight']">
             <image :class="[ismargin?'mimgr':'imgr']" :src="bigimg.imageUrl" :placeholder="defalutBg"></image>     
        </div>         
    </div>
</template>
<style scoped>
.threePicRow{
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
.picLeft{
    width:375px;
    height:340px
}
.mpicRight{
    width:360px;
    height:340px;
    border-left-style:solid;
    border-left-color:#EBECED;
    border-left-width:1px;
}
.picRight{
    width:374px;
    height:340px;
    border-left-style:solid;
    border-left-color:#EBECED;
    border-left-width:1px;
}
.mpicLeftTop{
    width:360px;
    height:170px;
    border-bottom-style:solid;
    border-bottom-color:#EBECED;
    border-bottom-width:1px;
}
.picLeftTop{
    width:375px;
    height:170px;
    border-bottom-style:solid;
    border-bottom-color:#EBECED;
    border-bottom-width:1px;
}
.mpicLeftBottom{
    width:360px;
    height:170px;
}
.picLeftBottom{
    width:375px;
    height:170px;
}
.mimglt{
    width:360px;
    height:168px
}
.imglt{
    width:375px;
    height:168px
}
.mimglb{
    width:360px;
    height:170px
}
.imglb{
    width:375px;
    height:170px;
}
.mimgr{
    width:359px;
    height:340px;
}
.imgr{
    width:374px;
    height:340px;
}
</style>
<script>
export default {
    data () {
      return {
          objstyle:{
              backgroundColor:'#d60f99'
          },
      }
    },
    props:['item'],
    created(){
    },
    computed:{
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