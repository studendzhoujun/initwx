/*
 * @Author: zhouJun 
 * @Date: 2018-03-12 15:18:13 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-06-08 14:05:08
 */

<template>
    <div class="double-row">
        <div class="double-row-goods">
          <div v-for="(item,index) in data.goodsList">
            <double-goods :idx="index" :item="item" :cartFlag="cartFlag" :ismargin="data.ismargin"></double-goods>
          </div>
        </div>
    </div>
</template>
<style scoped>
.double-row{
    width:750px;
    align-items:center;
    background-color:#F2F2F2;
}
.double-row-goods{  
    width:722px;
    flex-direction:row;
    flex-wrap:wrap;
}
</style>
<script>
import floorTitle from './floorTitle.vue'
import doubleGoods from './doubleGoods.vue'
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
       cartFlag(){
          return this.data.showCartFlag
       }
    },
    components:{
        floorTitle,
        doubleGoods
    },
    mounted(){
    },
    methods:{
    }
  }
</script>