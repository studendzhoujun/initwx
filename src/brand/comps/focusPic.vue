/*
 * @Author: zhouJun 
 * @Date: 2018-03-16 13:42:57 
 * @Last Modified by: yhw.yinhongwei
 * @Last Modified time: 2019-03-18 14:49:30
 */
<template>
  <div class="obox">
    <slider class="slider" interval="3000" auto-play="true">
      <div class="frame" v-for="(img,index) in datas">
        <image :ref="'item'+index" @click="go(img)" class="image" :src="img.imageUrl" :placeholder="defalutBg"></image>
      </div>
      <indicator class="dot"></indicator>
    </slider>
  </div>
</template>
<style scoped>
.obox{
  width:750px;
  height: 230px;
  margin-bottom:14px;
}
/* .frame {
  width: 750px;
  height: 230px;
} */
.image {
  width: 750px;
  height: 230px;
}
.slider {
  width: 750px;
  height: 230px;
}
.dot{
    width: 200px;
    height:20px;
    item-color:#cccccc;
    item-selected-color:#FFFFFF;
    item-size: 12px;
    position: absolute;
    left:250px;
    bottom: 20px;
}
</style>
<script>
export default {
  data() {
    return {
      focsuStyle:{
        height:'250px'
      }
    }
  },
  props:['data'],
  created() {

  },
  computed: {
     datas(){
       return this.data.focusPhotoListTemplet
     }
  },
  methods: {
    //轮播图跳转
    go(img){
      weex.requireModule('PageManagerModule').jump(img.scheme)
    }
  }
}
</script>
