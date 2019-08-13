/*
 * @Author: zhouJun 
 * @Date: 2018-03-12 15:18:13 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-06-08 11:47:08
 */

<template>
    <div class="single-row">
        <div class="single-row-goods" v-for="item in data.goodsList">
            <single-goods :item="item" :cartFlag="cartFlag" :ismargin="data.ismargin"></single-goods>
        </div>
    </div>
</template>
<style scoped>
.single-row{
    width:750px;
    align-items:center;
    background-color:#F2F2F2;
}
.single-row-goods{  
    width:750px;
    align-items:center;    
}
</style>
<script>
import floorTitle from './floorTitle.vue'
import singleGoods from './singleGoods.vue'
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
        singleGoods
    },
    mounted(){
    },
    methods:{
    }
  }
</script>