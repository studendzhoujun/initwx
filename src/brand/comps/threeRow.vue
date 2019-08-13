/*
 * @Author: zhouJun 
 * @Date: 2018-03-13 15:53:48 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-09-11 18:39:35
 */
<template>
    <div class="three-row">
        <floor-title :isTitle="false" :ismargin="data.ismargin" :objstyle="objstyle"></floor-title>
        <div class="three-row-goods">
          <div v-for="(item,index) in data.goodsList">
            <three-goods :item="item" :idx="index" :ismargin="data.ismargin"></three-goods>
          </div>
        </div>
    </div>
</template>
<style scoped>
.three-row{
    width:750px;
    align-items:center;
    background-color:#F2F2F2;
}
.three-row-goods{  
    width:722px;
    flex-direction:row;
    /*justify-content:space-around;*/
    flex-wrap:wrap;
}
</style>
<script>
import floorTitle from './floorTitle.vue'
import threeGoods from './threeGoods.vue'
export default {
    data () {
      return {
          objstyle:{
              backgroundColor:'#d60f99'
          },
      }
    },
	props:['data'],
    created(){
    },
    computed:{
    },
    components:{
        floorTitle,
        threeGoods
    },
    mounted(){
    },
    methods:{
    }
  }
</script>