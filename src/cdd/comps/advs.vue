<template>
  <div class="advs">
     <image class="advsImg" :src="imgg"></image>
  </div>
</template>
<style scoped>
  .advs{
      width:750px;
      height:168px;
  }
  .advsImg{
      width:750px;
      height:168px;
  }
</style>
<script>
  export default {
    data () {
      return {
        imgg:'//m.360buyimg.com/mobilecms/s750x366_jfs/t1/84256/4/4517/105872/5d485953Ecf971702/f9b8dd44f7ef4116.jpg!cr_1125x549_0_72!q70.jpg'
      }
    },
    methods:{

    }
  }
</script>
