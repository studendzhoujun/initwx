/*
 * @Author: zhouJun 
 * @Date: 2018-03-07 11:27:03 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-03-07 17:33:36
 */
<template>
   <waterfall :column-width="columnWidth" :column-count="columnCount" class="box">
      <cell @click="go">
      <div class="box2">
         <text>1</text>
         <text>133</text>
      </div>
      </cell>
      <cell>
        <div class="box2">
          <text>2</text>
        </div>
      </cell>
      <cell>
        <div class="box2">
          <text>3</text>
        </div>
      </cell>
      <cell>
        <div class="box2">
          <text>3</text>
        </div>
      </cell>
      <cell>
        <div class="box2">
          <text>3</text>
        </div>
      </cell>
      <cell>
        <div class="box2">
          <text>3</text>
        </div>
      </cell>
      <cell>
        <div class="box2">
          <text>3</text>
        </div>
      </cell>
      <cell>
        <div class="box2">
          <text>3</text>
        </div>
      </cell>
      <cell>
        <div class="box2">
          <text>3</text>
        </div>
      </cell>
      <cell>
        <div class="box2">
          <text>3</text>
        </div>
      </cell>
      <cell>
        <div class="box2">
          <text>3</text>
        </div>
      </cell>
      <cell>
        <div class="box2">
          <text>4</text>
        </div>
      </cell>
      <loading v-if="flag" class="loading-view" :display="loading_display" @loading="onloading">
           <loading-indicator style="height: 60px; width: 60px;color:#ccc"></loading-indicator>
      </loading>
      <loading v-else><text>无更多内容</text></loading>
   </waterfall>
</template>
<style scoped>
.box{
   width:750px;
   height:900px;
   position:absolute;
   left:0;
   top:200px;
}
.box1{
    width:750px;
    height:150px;
    background-color:#788;
    margin-top:5px;

}
.box2{
    margin-top:5px;
    background-color:#788;
    height:150px;
}
.loading-view {
    height: 80px;
    width: 750px;
    justify-content: center;
    align-items: center;
    background-color: red;
  }

</style>
<script>
export default {
    data () {
      return {
          columnWidth:'350',
          columnCount:2,
          loading_display:'hide',
          flag:true
      }
    },
    created(){
    },
    mounted(){
    },
    methods:{
        go(){
            if(this.columnWidth=='auto'){
                this.columnWidth='300'
                this.columnCount=2
                this.flag=true
            }else{
                this.columnWidth='auto'
                this.columnCount=1
                this.flag=false
            }
        },
        onloading(event){
          this.loading_display = 'show';
          setTimeout(()=>{
            this.loading_display = 'hide'
          },3000)
      }

    }
  }
</script>