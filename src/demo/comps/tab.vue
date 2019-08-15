<template>
  <div class="pro">
     <div @click="go(index)" v-for="(item,index) in datalist" :class="['pro1',isindex==index?'active':'']"><text class="col">{{item.text}}</text></div>
  </div>
</template>
<style scoped>
.pro{
   display:flex;
   flex-direction: row
}
.pro1{
    height: 200px;
    background-color:#091231;
    flex-direction: row;
    flex:1;
    justify-content:center;
    align-items:center;
}
.col{
  color:aliceblue;
}
.active{
    background-color:#323444;
}
</style>
<script>
  export default {
    data () {
      return {
         shouldFixed:true,
         isindex:0,
         datalist:[
           {text:'A'},
           {text:'B'},
           {text:'C'},
           {text:'D'}
         ]
      }
    },
    methods:{
      go(index){
       this.isindex=index
      }
    }
  }
</script>
